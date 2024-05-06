import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "12345",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-auth
      async authorize(credentials: any) {
        //DO ZOD VALIDATION/OTP VALIDATION HERE
        const hashedPass = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
          where: {
            mobile_number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            hashedPass,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.mobile_number,
            };
          }
          return null;
        }

        try {
          const user = await prisma.user.create({
            data: {
              mobile_number: credentials.phone,
              password: hashedPass,
            },
          });

          // SEND OTP TO PHONE NUMBER
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.mobile_number,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    // TODO determine type
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    // can add custom signin page/ other pages
  },
};

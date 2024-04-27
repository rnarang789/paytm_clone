import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "12345" },
        password: { label: "Password", type: "password" },
      },
      // TODO: User credentials type from next-auth
      async authorize(credentials: any) {
        //DO ZOD VALIDATION/OTP VALIDATION HERE
        const hashedPass = await bcrypt.hash(credentials.password, "12");
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

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.mobile_number,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
};

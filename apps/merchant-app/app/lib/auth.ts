import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        return {
          ...session,
          user: {
            id: token.sub,
          },
        };
      }
      return session;
    },
  },
};

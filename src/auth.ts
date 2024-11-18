import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.id && session.user) session.user.id = token.id;
      return session
    },
  },
  session: {strategy: "jwt"},
  ...authConfig,
});

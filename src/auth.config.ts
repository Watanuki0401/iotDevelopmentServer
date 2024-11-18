import { getUserByEmail } from "@/lib/prisma/get";
import { signInSchema } from "@/lib/schema";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: async (credentias) => {
        const validatedFeilds = signInSchema.safeParse(credentias);

        if (validatedFeilds.success) {
          const { email, password } = validatedFeilds.data;
          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;
          if(password === user.password) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

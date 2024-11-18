"use server";

import { z } from "zod";
import { signUpSchema } from "@/lib/schema";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/prisma/get";
import { updateUserEmail } from "@/lib/prisma/creates";

async function updateUserAction(values: z.infer<typeof signUpSchema>) {
  const session = await auth()
  const validatedFeilds = signUpSchema.safeParse(values);

  if (!validatedFeilds.success || !session?.user?.email || !session.user.id || !session.user.name) {
    return {
      isSuccess: false,
      message: "Validation error",
    };
  }

  try {
    const { name, email, password } = validatedFeilds.data;
    const user = await getUserByEmail(session.user.email);

    if (!user) throw new Error("not found user");
    if (user.password !== password) throw new Error("not match password");

    const updateUserData = await updateUserEmail(session.user.id, email);

    if (!updateUserData) throw new Error("update error");

    return {
      isSuccess: true,
      message: "update clear"
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "update failed"
    }
  }
}

export { updateUserAction };

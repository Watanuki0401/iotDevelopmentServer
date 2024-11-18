"use server";

import { z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/schema";
import { getUserByEmail } from "@/lib/prisma/get";
import { createUser } from "@/lib/prisma/creates";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { createInfluxUser } from "@/lib/influxdb/creates";
import { removeInfluxUser } from "@/lib/influxdb/removes";
import { removeUser } from "@/lib/prisma/remove";

async function signUpAction(values: z.infer<typeof signUpSchema>) {
  // zod validation chacker
  const validatedFeilds = signUpSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      isSuccess: false,
      message: "Validation Error",
    };
  }

  // To regist user data
  try {
    const { name, email, password } = validatedFeilds.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        isSuccess: false,
        message: "This email is already in use.",
      };
    }

    const token = await createInfluxUser(name, password);
    if (!token) throw new Error("token void");

    const user = await createUser(name, email, password, token);
    console.table(user);
    if (!user) {
      return {
        isSuccess: false,
        message: "Failed to create a user.",
      };
    }
    return {
      isSuccess: true,
      message: "User creation completed.",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Contact your system administrator.",
    };
  }
}

async function signInAction(values: z.infer<typeof signInSchema>) {
  // zod validation chacker
  const validatedFeilds = signInSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      isSuccess: false,
      message: "Validation Error",
    };
  }

  // Check credentials
  try {
    const { email, password } = validatedFeilds.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      isSuccess: true,
      message: "Welcome Back",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            message: "email or password are Wang.",
          };
        default:
          return {
            isSuccess: false,
            message: "login failure.",
          };
      }
    }
    return {
      isSuccess: false,
      message: "Something wrong",
    };
  }
}

async function signOutAction() {
  try {
    await signOut({ redirect: false });
    return {
      isSuccess: true,
      message: "Good bye.",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Something wrong",
    };
  }
}

async function removeUserAction () {
  try {
    const session = await auth()
    if(!session?.user?.name || !session.user.id) throw new Error("session error")
    const resultInfluxUser = await removeInfluxUser(session?.user?.name)
    if(!resultInfluxUser) throw new Error("Influx user remove incompleted.");

    await removeUser(session.user.id)

    const responce = await signOutAction();
    if(!responce.isSuccess) throw new Error("signoutError")

    return true
  } catch (error) {
    console.log(error)
    return false
  }
  return "ok"
}

export { 
  signUpAction, signInAction, signOutAction,
  removeUserAction
};

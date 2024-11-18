import { prisma } from "@/lib/prisma/prisma-plug";

async function authorizeInfluxToken(token: string | null) {
  try {
    if (!token) throw new Error("token isn't found");

    const user = await prisma.user.findUnique({
      where: { token },
    });
    if(!user) throw new Error("cannot find user");

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export {
  authorizeInfluxToken
}

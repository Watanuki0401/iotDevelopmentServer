import { prisma } from "@/lib/prisma/prisma-plug";
import { User } from "@prisma/client";

async function createUser(
  name: string,
  email: string,
  password: string,
  token: string
): Promise<User | null> {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        token,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateUserEmail(
  id: string,
  email: string
): Promise<User | null> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createDevice(
  name: string,
  viewType: string,
  userId: string,
  bucket: string | null
) {
  try {
    const device = await prisma.device.create({
      data: {
        name,
        viewType,
        bucket: bucket !== "" ? bucket : null,
        userId,
      },
    });
    return device;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createPhantomImage(name: string, deviceId: string) {
  try {
    const photo = await prisma.photo.create({
      data: {
        name,
        deviceId,
      },
    });

    return photo.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { createUser, updateUserEmail, createDevice, createPhantomImage };

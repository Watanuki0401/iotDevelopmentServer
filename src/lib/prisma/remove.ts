import { prisma } from "@/lib/prisma/prisma-plug";

async function removeUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function removeDevice(id: string) {
  try {
    await prisma.device.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function removePhoto(id: string) {
  try {
    await prisma.photo.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { removeUser, removeDevice, removePhoto};

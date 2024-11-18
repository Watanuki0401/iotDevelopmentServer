import { prisma } from "@/lib/prisma/prisma-plug";
import { Device, User } from "@prisma/client";

async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

async function getBucketsByName(bucket: string, userId: string) {
  if (bucket === "") return null;

  const buckets = await prisma.device.findFirst({
    where: {
      bucket,
      userId,
    },
  });

  return buckets;
}

async function getDevicesByUserId(userId: string): Promise<Device[]> {
  const devices = await prisma.device.findMany({
    where: {
      userId,
    },
  });

  return devices;
}

async function getDevicesByDeviceId(id: string): Promise<Device | null> {
  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });

  return device;
}

async function getExistDevice(bucket: string, userId: string, name: string) {
  const devices = await prisma.device.findMany({
    where: {
      bucket,
      userId,
    },
  });

  const existingDevice = devices.filter((device) => device.name !== name);

  return existingDevice.length !== 0 ? true : false;
}

async function getImage(deviceId: string) {
  const photos = await prisma.photo.findMany({
    where: {
      deviceId,
    },
  });
  
  return photos
}

export {
  getUserByEmail,
  getBucketsByName,
  getDevicesByUserId,
  getDevicesByDeviceId,
  getExistDevice,
  getImage,
};

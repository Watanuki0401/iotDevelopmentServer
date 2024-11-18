import { prisma } from "@/lib/prisma/prisma-plug";
import { Status } from "@prisma/client";

export async function updateDevice(
  id: string,
  status: Status,
  threshold: string
) {
  try {
    const device = await prisma.device.update({
      where: { id },
      data: {
        status,
        threshold,
      },
    });
    return device
  } catch (error) {
    console.log(error)
    return null
  }
}

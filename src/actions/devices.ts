"use server";

import { auth } from "@/auth";
import { createBucket } from "@/lib/influxdb/creates";
import { removeInfluxBuckets } from "@/lib/influxdb/removes";
import { createDevice } from "@/lib/prisma/creates";
import { getBucketsByName, getExistDevice } from "@/lib/prisma/get";
import { removeDevice } from "@/lib/prisma/remove";
import { updateDevice } from "@/lib/prisma/updates";
import { registerDeviceSchema } from "@/lib/schema";
import { Status } from "@prisma/client";
import { z } from "zod";

export async function DeviceAddAction(
  value: z.infer<typeof registerDeviceSchema>
) {
  const session = await auth();
  const validateFields = registerDeviceSchema.safeParse(value);

  if (!validateFields.success || !session?.user?.id || !session.user.name) {
    return {
      isSuccess: false,
      message: "validation Error",
    };
  }

  try {
    const { name, viewType, bucket } = validateFields.data;

    const hasBucket = await getBucketsByName(bucket, session.user.id);

    const device = await createDevice(name, viewType, session.user.id, viewType === "photo" ? "" : bucket);

    if (!device) {
      return {
        isSuccess: false,
        message: "error",
        device: null,
      };
    }
    if (viewType === "photo" || hasBucket) {
      return {
        isSuccess: true,
        message: "Device registed",
        device: device,
      };
    }

    await createBucket(bucket, session.user.name);

    return {
      isSuccess: true,
      message: "complete",
      device: device,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Something wrong",
      device: null,
    };
  }
}

export async function EditDeviceAction(
  id: string,
  status: Status,
  threshold: string
) {
  try {
    const result = await updateDevice(id, status, threshold);
    return {
      isSuccess: true,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Something wrong",
    };
  }
}

export async function RemoveDeviceAction(
  id: string,
  name: string,
  bucket: string | null,
  userName: string,
  userId: string
) {
  try {
    if (bucket) {
      const isBukets = await getExistDevice(bucket, userId, name);
      if (!isBukets) {
        await removeInfluxBuckets(userName, bucket);
      }
    }  
    await removeDevice(id);
    return {
      isSuccess: true,
      message: "device deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "delete process failre",
    };
  }
}

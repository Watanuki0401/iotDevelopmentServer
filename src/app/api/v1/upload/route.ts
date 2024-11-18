import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { createPhantomImage } from "@/lib/prisma/creates";
import { getImage } from "@/lib/prisma/get";
import { removePhoto } from "@/lib/prisma/remove";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "");
const POOL_LIMIT = (Number(process.env.QUANTITY_LIMIT) ?? 5) - 1;

export async function POST(req: NextRequest) {
  try {
    const deviceId = req.headers.get("deviceId");
    if (!deviceId)
      return NextResponse.json({ success: "1 false" }, { status: 400 });

    // remove function
    const photoList = await getImage(deviceId);
    console.log(photoList.length)
    if (photoList.length >= POOL_LIMIT) {
      const removePhotoList = photoList.slice(0, photoList.length - POOL_LIMIT);
      Promise.all(
        removePhotoList.map(async (item) => {
          const result = await removePhoto(item.id);
          if (!result)
            return NextResponse.json(
              { success: "delete image function faild." },
              { status: 500 }
            );
          fs.unlinkSync(
            path.resolve(UPLOAD_DIR, `${item.id}${path.extname(item.name)}`)
          );
        })
      );
    }

    // register function
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const name = (file as File).name;
    const poolName = await createPhantomImage(name, deviceId);

    if (!poolName)
      return NextResponse.json({ success: "2 false" }, { status: 400 });

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
        console.log(UPLOAD_DIR);
      }

      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, `${poolName}${path.extname(name)}`),
        buffer
      );
    } else {
      return NextResponse.json({ success: "3 false" }, { status: 400 });
    }

    return NextResponse.json(
      { success: "true", name: (file as File).name },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: "false", message: "something worng" },
      { status: 500 }
    );
  }
}

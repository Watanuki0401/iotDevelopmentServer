import { getImage } from "@/lib/prisma/get";
import { NextRequest, NextResponse } from "next/server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export async function GET(req:NextRequest) {
  const deviceId = req.headers.get('deviceId');
  if(!deviceId) return NextResponse.json({isSuccess: false}, {status: 403});
  
  const photoList = await getImage(deviceId)
  console.log(
    photoList.length,
    photoList.slice(0, photoList.length - 5).length,
    photoList.slice(photoList.length - 5, photoList.length).slice(-1)[0]
  )
  const photo = photoList.slice(-1)[0]
  if (!photo) return NextResponse.json({isSuccess: false}, {status: 400});

  return NextResponse.json({
    isSuccess: true,
    image: {
      photoId: photo.id + '.' + photo.name.split('.').pop(),
      name: photo.name,
      createdAt: dayjs(photo.createdAt).tz("Asia/Tokyo").format("MM/DD HH:mm:ss"),
    }
  }, {status: 200})
}
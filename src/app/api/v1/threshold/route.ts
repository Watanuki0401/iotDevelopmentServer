import { authorizeInfluxToken } from "@/lib/prisma/authorizes";
import { getDevicesByDeviceId } from "@/lib/prisma/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("influx-token");
  const deviceId = req.headers.get("device-id");

  const authorize = await authorizeInfluxToken(token);
  if (!authorize || !token || !deviceId) {
    return NextResponse.json({ message: "invalid Access" }, { status: 400 });
  }

  const devices = await getDevicesByDeviceId(deviceId);

  return NextResponse.json({ devices });
}

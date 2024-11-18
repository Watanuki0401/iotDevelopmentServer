import { auth } from "@/auth"
import DeviceTable from "@/components/devicetable";
import { getDevicesByUserId, getUserByEmail } from "@/lib/prisma/get";
import { redirect } from "next/navigation"

const HOST_URL = process.env.HOST_ADDRESS || "";
const HOST_INFLUX_URL = process.env.HOST_INFLUX_ADDRESS || "";

export default async function UserHome() {
	const session = await auth()
	if (!session?.user?.email || !session.user.id) return redirect("/");

	const plainUser = await getUserByEmail(session.user.email)
	const devices = await getDevicesByUserId(session.user.id)

	if (!plainUser?.token) return redirect("/");

	return (
		<div className="grid gap-y-5 pt-4">
			<h1 className="text-3xl font-semibold">Welcome Back&nbsp;<span className="text-primary">{plainUser?.name}</span></h1>
			<div className="space-y-2">
				<p>Now on Your Status :&nbsp;<span>{plainUser?.role}</span></p>
				<p>Regiser email address :&nbsp;<span>{plainUser?.email}</span></p>
				<p>Your devices token :&nbsp;<span>{plainUser.token}</span></p>
			</div>
			<DeviceTable deviceList={devices} user={session.user} token={plainUser.token} uri1={HOST_INFLUX_URL} uri2={HOST_URL}/>
		</div>
	)
}
import { auth } from "@/auth"
import { DeleteUserData } from "@/components/delete-userdata"
import { UpdateUserdata } from "@/components/update-userdata"
import { getUserByEmail } from "@/lib/prisma/get"
import { redirect } from "next/navigation"

export default async function SettingPage () {
  const session = await auth()
  if(!session?.user?.email) return redirect("/")
  
  const plainUser = await getUserByEmail(session?.user?.email)

  return (
    <div className="pt-3 grid">
      <h1 className="text-3xl font-semibold">Account Configuration</h1>
      <div className="mt-5 grid gap-4">
        <UpdateUserdata name={plainUser?.name} email={plainUser?.email}/>
        <DeleteUserData />
      </div>
    </div>
  )
}
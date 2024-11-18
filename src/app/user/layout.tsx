import { auth } from "@/auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSideBar } from "@/components/user-sidebar"
import { getUserByEmail } from "@/lib/prisma/get"
import { redirect } from "next/navigation"

export default async function UserLandLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if(!session?.user?.email) return <div>Access denied</div>
  const planeUser = await getUserByEmail(session?.user?.email)
  if(!planeUser) return redirect("/")
  const user = {
    name: planeUser.name,
    email: planeUser.email,
  }

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <UserSideBar user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
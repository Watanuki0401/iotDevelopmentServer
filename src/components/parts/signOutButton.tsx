"use client"

import { signOutAction } from "@/actions/autorizations"
import { signOutRedirect } from "@/actions/redirects"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

export function SignOutButton() {
  const onClick = async () => {
    const res = await signOutAction()
    console.log(res)
    if (res.isSuccess) {
      toast.info("Good bye user.")
      signOutRedirect();
    } else {
      toast.error("Something worng.")
    }
  }

  return (
    <Button onClick={() => onClick()}>サインアウト</Button>
  )
}

export function SidebarSignOutButton() {
  const onClick = async () => {
    const res = await signOutAction()
    console.log(res)
    if (res.isSuccess) {
      toast.info("Good bye user.")
      signOutRedirect();
    } else {
      toast.error("Something worng.")
    }
  }

  return (
    <Button variant={"ghost"} className="w-full justify-start" onClick={() => onClick()} asChild>
      <div className="select-none">
        <LogOut className="mr-2 h-4 w-4"/>
        サインアウト
      </div>
    </Button>
  )
}

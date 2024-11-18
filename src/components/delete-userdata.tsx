"use client"

import { removeUserAction } from "@/actions/autorizations";
import { signOutRedirect } from "@/actions/redirects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteUserData() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const deleteSubmit = async () => {
    const res = await removeUserAction();
    if (res) {
      toast.info("Account removed")
      signOutRedirect();
    } else {
      toast.error("remove Invalid")
    }
  }

  return (
    <div className="container">
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Delete User AREA</CardTitle>
          <CardDescription>ユーザ削除の管理画面です。不用意な操作に気をつけてください。</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant={"destructive"}
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >アカウント削除</Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-destructive">
          <DialogHeader>
            <DialogTitle className="text-destructive">アカウント削除の確認</DialogTitle>
            <DialogDescription>不用意な操作を行わないでください。</DialogDescription>
          </DialogHeader>
          <div>
            <p className="text-muted-foreground">本操作は取り消すことができません。</p>
            <p className="text-muted-foreground">了承の上ボタンを押下してください。</p>
            <form action={deleteSubmit}>
              <Button className="w-full mt-3" variant={"destructive"}>削除</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
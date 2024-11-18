import { auth } from "@/auth";
import { ThemeSwitcher } from "@/components/dark-mode/theme-switcher";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/parts/signOutButton";
import Link from "next/link";

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-end space-x-4">
          <ThemeSwitcher />
          <Button variant={"outline"} asChild>
            <Link href="/signin">サインイン</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">サインアップ</Link>
          </Button>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold mb-4">Sensing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            エッジデバイスと連携し、あなたの生活をより豊かに。
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-end space-x-4">
        <ThemeSwitcher />
        <SignOutButton />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-4">Hello User</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          エッジデバイスと連携し、あなたの生活をより豊かに。
        </p>
        <Link href={"/user"} className="text-muted-foreground underline-offset-4 transition-colors hover:underline">ダッシュボートへ移る</Link>
      </main>
    </div>
  )

}

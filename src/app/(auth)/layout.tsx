import { ThemeSwitcher } from "@/components/dark-mode/theme-switcher"
import Link from "next/link"
import React from "react"

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="p-4 flex justify-between">
				<Link href="/" className="pl-2 text-2xl font-bold">Sensing</Link>
				<ThemeSwitcher />
			</header>
			{children}
		</div>
	)
}
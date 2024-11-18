"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			aria-label={theme === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"}
		>
			{theme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			) : (
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			)}
			<span className="sr-only">
				{theme === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"}
			</span>
		</Button>
	)
}
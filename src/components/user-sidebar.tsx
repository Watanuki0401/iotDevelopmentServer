'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { SidebarSignOutButton } from "@/components/parts/signOutButton"
import { cn } from "@/lib/utils"
import { House, LayoutDashboard, LucideIcon, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
	title: string,
	href: string,
	icon: LucideIcon
}

interface UserSidebarProps {
	user: {
		name?: string | null,
		email?: string | null,
	}
}

const navItems: NavItem[] = [
	{
		title: "ホーム",
		href: "/user",
		icon: House
	},
	{
		title: "ダッシュボード",
		href: "/user/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "設定",
		href: "/user/settings",
		icon: Settings
	}
]

export function UserSideBar({ user }: UserSidebarProps) {
	const pathname = usePathname()

	return (
		<Sidebar>
			<SidebarHeader className="border-b px-6 py-4">
				<div className="flex items-center gap-3">
					<User className="h-6 w-6" />
					<div>
						<p className="font-semibold">{user.name}</p>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{navItems.map((item) => (
						<SidebarMenuItem key={item.href}>
							<Link
								href={item.href}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
									pathname === item.href ? "bg-accent" : "bg-transparent"
								)}
							>
								<item.icon className="h-4 w-4" />
								{item.title}
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<SidebarSignOutButton />
			</SidebarFooter>
		</Sidebar>
	)
}

"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signInSchema } from "@/lib/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/actions/autorizations";
import { toast } from "sonner";
import { signInRedirect } from "@/actions/redirects";

export default function SignIn() {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		const res = await signInAction(values)
		if(res.isSuccess) {
			toast.success("Welcome Back User.")
			signInRedirect();
		} else {
			toast.error("Failed to login.")
		}
	}

	return (
		<main className="flex-grow flex justify-center items-center px-4">
			<Card className="w-[512px]">
				<CardHeader>
					<CardTitle>サインイン</CardTitle>
					<CardDescription>ここはサインインページです。</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>	<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="example@mail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="************"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
							>Sign In</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<div className="text-sm flex">
						<span>アカウントをお持ちでないですか？&ensp;</span>
						<Link
							href={"/signup"}
							className="text-primary underline-offset-4 transition-colors hover:underline"
						>サインアップ</Link>
					</div>
				</CardFooter>
			</Card>
		</main >
	)
}
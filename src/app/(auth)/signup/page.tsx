"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@/actions/autorizations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signUpSchema } from "@/lib/schema";
import { signupRedirect } from "@/actions/redirects";

export default function SignUp() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		const res = await signUpAction(values)
		console.log(values)
		if (res.isSuccess) {
			toast.success("Success to create user")
			signupRedirect();
		} else {
			toast.error("Failed to create user")
		}
	}

	return (
		<main className="flex-grow flex justify-center items-center px-4">
			<Card className="w-[512px]">
				<CardHeader>
					<CardTitle>サインアップ</CardTitle>
					<CardDescription>ここはサインアップページです。</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						> <FormField 
								control={form.control}
								name="name"
								render={({field}) => (
									<FormItem>
										<FormLabel>User Name</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Bob"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="email"
								render={({field}) => (
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
								render={({field}) => (
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
							>Sign Up</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<div className="text-sm flex">
						<span>アカウントを既にお持ちですか？&ensp;</span>
						<Link
							href={"/signin"}
							className="text-primary underline-offset-4 transition-colors hover:underline"
						>サインイン</Link>
					</div>
				</CardFooter>
			</Card>
		</main>
	)
}
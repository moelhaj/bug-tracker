import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "app/features/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

const UserSchema = z.object({
	name: z.string().trim(),
	email: z.string().email().trim().toLowerCase(),
	password: z
		.string()
		.regex(passwordRegex, {
			message:
				"Password must have 1 lower case letter, 1 upper case letter, 1 number, and 1 special character",
		})
		.min(8, {
			message: " Password should be at least 8 character",
		}),
	confirmPassword: z.string().min(8),
});

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		// defaultValues: UserSchema.parse({
		// 	name: "",
		// 	email: "",
		// 	password: "",
		// 	confirmPassword: "",
		// }),
	});

	async function onSubmit(data: z.infer<typeof UserSchema>) {
		setError("");
		if (data.password !== data.confirmPassword) {
			return setError("Passwords didn't match");
		}
		try {
			await register({
				name: data.name,
				email: data.email,
				password: data.password,
			}).unwrap();
		} catch (error: any) {
			if (error.originalStatus === 409) {
				return setError("Account taken");
			}
		}
	}

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
		}
	}, [isSuccess]);

	return (
		<div className="w-[400px] rounded-md bg-white px-3 py-5">
			<h1 className="text-2xl font-bold">Sign Up</h1>
			{error !== "" && <p className="mt-3 text-sm text-red-600">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 w-full space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled={isLoading} {...field} />
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
									<Input disabled={isLoading} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>confirm Password</FormLabel>
								<FormControl>
									<Input disabled={isLoading} type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						Sign Up
					</Button>
				</form>
			</Form>
			<div className="mt-10">
				<p className="flex items-center gap-1">
					Already have an account?
					<Link to="/login" className="duration-300 hover:text-gray-900">
						Sign in.
					</Link>
				</p>
			</div>
		</div>
	);
}

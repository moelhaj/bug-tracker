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
import { useRegisterMutation, useVerifyTokenMutation } from "app/features/authApi";
import { useAppSelector } from "app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

const passwordsSchema = z.object({
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

export default function ResetPassword() {
	const navigate = useNavigate();
	// const pathname = usePathname();
	const location = useLocation();
	console.log(location);
	// const token = pathname.substring(pathname.lastIndexOf("/") + 1);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const [verifyToken, { isLoading: verifyLoading, isSuccess: verifySuccess }] =
		useVerifyTokenMutation();
	const form = useForm<z.infer<typeof passwordsSchema>>({
		resolver: zodResolver(passwordsSchema),
		// defaultValues: passwordsSchema.parse({
		// 	password: "",
		// 	confirmPassword: "",
		// }),
	});

	async function onSubmit(data: z.infer<typeof passwordsSchema>) {
		setError("");
		if (data.password !== data.confirmPassword) {
			return setError("Passwords didn't match");
		}

		// try {
		// 	await verifyToken(token);
		// 	if (!verifySuccess) {
		// 		await register({
		// 			email: user.email,
		// 			password: data.password,
		// 		}).unwrap();
		// 	}
		// } catch (error: any) {
		// 	if (error.originalStatus === 409) {
		// 		return setError("Error resting password, try again later");
		// 	}
		// }
	}

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
		}
	}, [isSuccess]);

	return (
		<div className="w-[400px] rounded-md bg-white px-3 py-5">
			<h1 className="text-2xl font-bold">Reset Password</h1>
			{error !== "" && <p className="mt-3 text-sm text-red-600">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 w-full space-y-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading || verifyLoading}
										type="password"
										{...field}
									/>
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
									<Input
										disabled={isLoading || verifyLoading}
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading || verifyLoading}>
						Reset
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

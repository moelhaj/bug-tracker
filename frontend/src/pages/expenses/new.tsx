import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddExpenseMutation } from "app/features/expensesApi";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "app/store";
import { FiPlus } from "react-icons/fi";

type Category = {
	value: string;
	label: string;
};

const categories: Category[] = [
	{
		value: "rent",
		label: "Rent",
	},
	{
		value: "shopping",
		label: "Shopping",
	},
	{
		value: "transportation",
		label: "Transportation",
	},
	{
		value: "entertainment",
		label: "Entertainment",
	},
	{
		value: "health",
		label: "Health",
	},
	{
		value: "utilities",
		label: "Utilities",
	},
	{
		value: "others",
		label: "Others",
	},
];

const ExpenseSchema = z.object({
	title: z.string().trim().default(""),
	details: z.string().trim().default(""),
	amount: z.string().default(""),
});

export default function NewExpense() {
	const formRef = useRef<any>(null);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [category, setCategory] = useState("");
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof ExpenseSchema>>({
		resolver: zodResolver(ExpenseSchema),
		defaultValues: ExpenseSchema.parse({
			title: "",
			details: "",
			amount: "",
		}),
	});

	const [addExpense, { isLoading, isSuccess }] = useAddExpenseMutation();

	async function onSubmit(data: z.infer<typeof ExpenseSchema>) {
		setError("");
		setCategoryError("");
		if (category === "" || !category) {
			return setCategoryError("Select a category");
		}
		try {
			const response: any = await addExpense({
				title: data.title,
				details: data.details,
				amount: data.amount.toString(),
				category,
				userId: user.id,
			});
			if (response.error) return setError("Something wrong try again later");
		} catch (error: any) {
			return setError("Something wrong try again later");
		}
	}

	useEffect(() => {
		if (formRef.current) {
			formRef.current.reset();
		}
	}, []);

	useEffect(() => {
		if (isSuccess) {
			formRef.current.reset();
			setOpen(false);
		}
	}, [isSuccess]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="py-1">
					<span className="hidden md:flex">New</span>
					<span className="flex md:hidden">
						<FiPlus />
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Expense</DialogTitle>
				</DialogHeader>
				{error !== "" && <p className="mt-2 text-sm text-red-600">{error}</p>}
				<Form {...form}>
					<form
						ref={formRef}
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-2 w-full space-y-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="details"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Details</FormLabel>
									<FormControl>
										<Textarea
											className="resize-none"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input disabled={isLoading} type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-3 pt-3">
							<Label>Category</Label>
							<Select
								value={category !== "" ? category : categories[0].label}
								onValueChange={setCategory}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{categories.map((category: Category) => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							{categoryError !== "" && (
								<p className="mt-3 text-sm text-red-600">{categoryError}</p>
							)}
						</div>
						<div className="mt-3 flex justify-end">
							<Button type="submit" disabled={isLoading}>
								Add
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

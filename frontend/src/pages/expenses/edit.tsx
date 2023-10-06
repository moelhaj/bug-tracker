import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateExpenseMutation } from "app/features/expensesApi";
import { useAppSelector } from "app/store";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export default function EditExpense({ expense, open, setOpen }: any) {
	const formRef = useRef<any>(null);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [category, setCategory] = useState("");
	const form = useForm<z.infer<typeof ExpenseSchema>>({
		resolver: zodResolver(ExpenseSchema),
		defaultValues: ExpenseSchema.parse({
			title: expense.title,
			details: expense.details,
			amount: expense.amount,
		}),
	});

	const [updateExpense, { isLoading, isSuccess }] = useUpdateExpenseMutation();

	async function onSubmit(data: z.infer<typeof ExpenseSchema>) {
		setError("");
		setCategoryError("");
		try {
			const response: any = await updateExpense({
				id: expense.id,
				title: data.title,
				details: data.details,
				amount: data.amount.toString(),
				category: category !== "" ? category : expense.category,
				userId: user.id,
			});
			if (response.error) return setError("Something wrong try again later");
		} catch (error: any) {
			return setError("Something wrong try again later");
		}
	}

	useEffect(() => {
		if (isSuccess) {
			formRef.current.reset();
			setOpen(false);
		}
	}, [isSuccess]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Expense</DialogTitle>
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
								value={category !== "" ? category : expense.category.toLowerCase()}
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
								Update
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

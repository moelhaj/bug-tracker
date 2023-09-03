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
	FormDescription,
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
import { useFilterExpenseMutation } from "app/features/expensesApi";
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
import { BsFilePdf } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import ReactToPrint from "react-to-print";

type Category = {
	value: string;
	label: string;
};

const ExpenseSchema = z.object({
	startDate: z.date(),
	endDate: z.date(),
});

export default function Report() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const formRef = useRef<any>(null);
	const componentRef = useRef<any>(null);
	const { user } = useAppSelector((state: any) => state.user);
	const [error, setError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [category, setCategory] = useState("");
	const [pdfData, setPdfData] = useState<any>(null);
	const form = useForm<z.infer<typeof ExpenseSchema>>({
		resolver: zodResolver(ExpenseSchema),
		defaultValues: ExpenseSchema.parse({
			startDate: new Date(),
			endDate: new Date(),
		}),
	});

	const [filterExpense, { isLoading, isSuccess }] = useFilterExpenseMutation();

	async function onSubmit(data: z.infer<typeof ExpenseSchema>) {
		setLoading(true);
		try {
			const response: any = await filterExpense(data);
			setPdfData(response.data);
		} catch (error: any) {
			return setError("Something wrong try again later");
		}
	}

	// useEffect(() => {
	// 	if (pdfData) {
	// 		setLoading(false);
	// 		setOpen(false);
	// 	}
	// }, [pdfData]);

	useEffect(() => {
		if (open) {
			if (formRef.current) {
				formRef.current.reset();
			}
			setPdfData(null);
			setLoading(false);
		}
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button className="flex items-center gap-3">
					<BsFilePdf />
					<span>Generate Report</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Expenses Report</DialogTitle>
				</DialogHeader>
				{error !== "" && <p className="mt-2 text-sm text-red-600">{error}</p>}
				{pdfData && (
					<>
						<div
							ref={componentRef}
							className="h-40 overflow-hidden overflow-x-scroll overflow-y-scroll"
						>
							<table className="w-full border-collapse">
								<thead className="border-b">
									<tr>
										<th className="text-left">Title</th>
										<th className="text-left">Details</th>
										<th className="text-left">Category</th>
										<th className="text-left">Amount</th>
									</tr>
								</thead>
								<tbody>
									{pdfData.map((expense: any) => (
										<tr key={expense.id} className="border-b">
											<td>{expense.title}</td>
											<td>{expense.details}</td>
											<td>{expense.category}</td>
											<td>{expense.amount}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<ReactToPrint
							trigger={() => <Button>Print</Button>}
							content={() => componentRef.current}
						/>
					</>
				)}
				{!pdfData && (
					<Form {...form}>
						<form
							ref={formRef}
							onSubmit={form.handleSubmit(onSubmit)}
							className="mt-2 w-full space-y-4"
						>
							{/* start date */}
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Start Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={date =>
														date > new Date() ||
														date < new Date("1900-01-01")
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* start date */}
							<FormField
								control={form.control}
								name="endDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>End Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={date =>
														date > new Date() ||
														date < new Date("1900-01-01")
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="mt-3 flex justify-end">
								<Button type="submit" disabled={loading}>
									Generate PDF Report
								</Button>
							</div>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
}

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DeleteExpense from "../delete";
import EditExpense from "../edit";
import NewExpense from "../new";
import { Filters } from "./filters";
import Menu from "./menu";
import Pagination from "./pagination";

export default function DataTable({ data, options, filters, setFilters }: any) {
	const [action, setAction] = useState("");
	const [expense, setExpense] = useState<any>(null);
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "title",
			header: () => <div className="text-green font-bold">Title</div>,
		},
		{
			accessorKey: "details",
			header: () => <div className="text-green font-bold">Details</div>,
		},
		{
			accessorKey: "category",
			header: () => <div className="text-green font-bold">Category</div>,
			cell: ({ row }) => {
				return <div className="capitalize">{row.original.category}</div>;
			},
		},
		{
			accessorKey: "amount",
			header: () => <div className="text-green font-bold">Amount</div>,
		},
		{
			header: () => <div className="text-green text-center font-bold"></div>,
			id: "actions",
			cell: ({ row }) => {
				return (
					<div className="flex justify-center">
						<Menu row={row} setAction={setAction} setExpense={setExpense} />
					</div>
				);
			},
		},
	];
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		enableRowSelection: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<div className="rounded-md bg-white p-3">
				{/* filters */}
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-1 items-center space-x-2">
						<Input
							placeholder="Search"
							value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
							onChange={event =>
								table.getColumn("title")?.setFilterValue(event.target.value)
							}
							className="h-8 w-[150px] lg:w-[250px]"
						/>
						<Filters
							data={data}
							options={options}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
					<NewExpense />
				</div>
				{/* table */}
				<div className="mt-5 rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup: any) => (
								<TableRow key={headerGroup.id} className="border-slate">
									{headerGroup.headers.map((header: any) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row: any) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className="border-slate"
									>
										{row.getVisibleCells().map((cell: any) => (
											<TableCell key={cell.id} className="font-[16px]">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				{/* pagination */}
				<Pagination table={table} />
			</div>
			{expense && action === "edit" && (
				<EditExpense
					expense={expense}
					open={expense && action === "edit"}
					setOpen={() => {
						setAction("");
						setExpense("");
					}}
				/>
			)}
			{expense && (
				<DeleteExpense
					expense={expense}
					open={expense && action === "delete"}
					setOpen={() => {
						setAction("");
						setExpense("");
					}}
				/>
			)}
		</>
	);
}

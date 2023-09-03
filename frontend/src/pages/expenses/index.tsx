import Report from "./report";
import DataTable from "./table/dataTable";
import { useGetExpensesQuery } from "app/features/expensesApi";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { filterArray } from "utils/filterArray";

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

export default function Expenses() {
	const [data, setData] = useState<any>(null);
	const [filters, setFilters] = useState<any>([]);
	const {
		data: expenses,
		isLoading,
		isFetching,
		isError,
	} = useGetExpensesQuery(undefined, {
		refetchOnFocus: true,
	});

	useEffect(() => {
		if (expenses && expenses.length) {
			setData(expenses);
		}
	}, [expenses]);

	useEffect(() => {
		if (filters && filters?.length) {
			const result = filterArray(filters, expenses, "category");
			if (result.length > 0) setData(result);
		} else {
			setData(expenses);
		}
	}, [expenses, filters]);

	if (isLoading)
		return (
			<div className="grid h-screen w-screen place-content-center">
				<CgSpinnerTwo className="animate-spin" size={40} />
			</div>
		);

	return (
		<div>
			<div className="flex flex-col gap-3 p-3">
				{/* overview */}
				<div className="mt-5 flex items-center">
					{data && data.length > 0 && <Report />}
					{data && data.length < 1 && (
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<AiOutlineInfoCircle />
							<span>Add expenses to be able to generate reports</span>
						</div>
					)}
				</div>
				{/* Table */}
				<div className="mt-5">
					{data && (
						<DataTable
							data={data}
							options={categories}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { TableNoContent, TableSkeleton } from "../../components/elements/Skeletons";
import Debounce from "../../utilities/Debounce";
import Row from "./Row";
import useWorkItem from "../../hooks/useWorkItem";

type Props = {
	success: boolean;
	loading: boolean;
	workItems: any;
};

export default function Table({ workItems, success, loading }: Props) {
	const { filters, setFilters } = useWorkItem();
	const [keyword, setKeyword] = useState("");
	const [debouncedKeyword, setDebouncedKeyword] = useState("");

	Debounce(() => setDebouncedKeyword(keyword), [keyword], 1000);

	useEffect(() => {
		setFilters({ ...filters, page: 0, title: debouncedKeyword });
	}, [debouncedKeyword]);

	return (
		<>
			<div className="x-scroll mt-7 w-full overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
				{/* Header */}
				<div className="flex w-full items-center justify-between border-b border-b-gray-200 bg-white p-2 dark:border-none dark:bg-gray-700">
					<input
						onChange={(e: any) => setKeyword(e.target.value)}
						className="input"
						type="text"
						placeholder="Search"
					/>
				</div>
				<table className="w-full border-collapse text-sm sm:text-base">
					<thead>
						<tr className="border-b border-b-gray-200 text-left font-bold dark:border-none">
							<td>Title</td>
							<td>Type</td>
							<td>State</td>
							<td>Assigned To</td>
						</tr>
					</thead>
					{loading && (
						<TableSkeleton
							rows={workItems?.length < 5 ? workItems?.length : 5}
							columns={5}
						/>
					)}
					{success && (
						<tbody>
							{workItems?.length < 1 && <TableNoContent />}
							{workItems?.length > 0 &&
								workItems.map((item: any) => {
									return <Row key={item.id} item={item} />;
								})}
						</tbody>
					)}
				</table>
			</div>
		</>
	);
}

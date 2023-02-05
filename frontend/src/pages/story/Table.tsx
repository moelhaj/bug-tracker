import { useEffect, useState } from "react";
import { TableNoContent, TableSkeleton } from "../../components/elements/Skeletons";
import Debounce from "../../utilities/Debounce";
import Row from "./Row";
import useWorkItem from "../../hooks/useProject";

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
			<div className="x-scroll mt-5 w-full overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
				{/* Header */}
				<table className="y-scroll h-20 w-full border-collapse overflow-hidden overflow-y-scroll text-sm">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr className="border-b border-b-gray-200 text-left text-gray-500 dark:border-b-gray-900 dark:text-gray-300">
							<td>Title</td>
							<td>Type</td>
							<td>Status</td>
							<td>Assigned To</td>
						</tr>
					</thead>
					{loading && (
						<TableSkeleton
							rows={workItems?.length < 5 ? workItems?.length : 5}
							columns={4}
						/>
					)}
					{success && (
						<tbody>
							{workItems?.length < 1 && <TableNoContent message="No Work Items" />}
							{workItems?.length > 0 &&
								workItems?.map((item: any) => {
									return <Row key={item.id} item={item} />;
								})}
						</tbody>
					)}
				</table>
			</div>
		</>
	);
}

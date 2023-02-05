import { useEffect, useState } from "react";
import { TableNoContent, TableSkeleton } from "../../components/elements/Skeletons";
import Debounce from "../../utilities/Debounce";
import Row from "./Row";
import useWorkItem from "../../hooks/useProject";

type Props = {
	success: boolean;
	loading: boolean;
	stories: any;
};

export default function Table({ stories, success, loading }: Props) {
	const { filters, setFilters } = useWorkItem();
	const [keyword, setKeyword] = useState("");
	const [debouncedKeyword, setDebouncedKeyword] = useState("");

	Debounce(() => setDebouncedKeyword(keyword), [keyword], 1000);

	useEffect(() => {
		setFilters({ ...filters, page: 0, title: debouncedKeyword });
	}, [debouncedKeyword]);

	return (
		<>
			<div className="mt-10 flex w-full items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-700">
				<input
					onChange={(e: any) => setKeyword(e.target.value)}
					className="input"
					type="text"
					placeholder="Search"
				/>
			</div>
			<div className="x-scroll mt-5 w-full overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
				{/* Header */}
				<table className="w-full border-collapse text-sm">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr className="border-b border-b-gray-200 text-left text-gray-500 dark:border-b-gray-900 dark:text-gray-300">
							<td>Title</td>
							<td>Items</td>
							<td>Assigned To</td>
						</tr>
					</thead>
					{loading && (
						<TableSkeleton
							rows={stories?.length < 5 ? stories?.length : 5}
							columns={3}
						/>
					)}
					{success && (
						<tbody>
							{stories?.length < 1 && <TableNoContent message="No user story" />}
							{stories?.length > 0 &&
								stories.map((story: any) => {
									return <Row key={story.id} story={story} />;
								})}
						</tbody>
					)}
				</table>
			</div>
		</>
	);
}

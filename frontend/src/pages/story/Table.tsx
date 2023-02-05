import { useEffect, useState, useMemo } from "react";
import { BiFilter } from "react-icons/bi";
import Menu from "../../components/elements/Menu";
import { TableNoContent, TableSkeleton } from "../../components/elements/Skeletons";
import classNames from "../../utilities/ClassNames";
import Debounce from "../../utilities/Debounce";
import Row from "./Row";

type Props = {
	success: boolean;
	loading: boolean;
	workItems: any;
};

export default function Table({ workItems, success, loading }: Props) {
	const [filter, setFilter] = useState("");
	const [keyword, setKeyword] = useState("");
	const [filterMenu, setFilterMenu] = useState(false);
	const [debouncedKeyword, setDebouncedKeyword] = useState("");
	const filterTypes = ["All", "Task", "Bug"];

	Debounce(() => setDebouncedKeyword(keyword), [keyword], 1000);

	useEffect(() => {
		setFilter(debouncedKeyword);
	}, [debouncedKeyword]);

	const rows = useMemo(() => {
		let items = workItems;
		if (filter || keyword) {
			items = workItems?.filter(
				(item: any) =>
					(item.title.toLowerCase().includes(keyword.toLowerCase()) ||
						item.status.toLowerCase().includes(keyword.toLowerCase()) ||
						item.assignee.name.toLowerCase().includes(keyword.toLowerCase())) &&
					item.type.includes(filter)
			);
		}
		return items;
	}, [workItems, keyword, filter]);

	return (
		<>
			<div className="flex w-full items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-700">
				<input
					onChange={(e: any) => setKeyword(e.target.value)}
					className="input"
					type="text"
					placeholder="Search"
				/>
				<Menu
					hide={() => setFilterMenu(false)}
					isOpen={filterMenu}
					styles="top-10 right-0"
					button={
						<div
							onClick={() => setFilterMenu(!filterMenu)}
							className="block cursor-pointer rounded-md p-1 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
						>
							<BiFilter size={25} />
						</div>
					}
				>
					<div className="flex w-40 flex-col gap-1 p-1">
						{filterTypes &&
							filterTypes.map((item: any) => (
								<div
									key={item}
									onClick={() => {
										setFilterMenu(false);
										item === "All" ? setFilter("") : setFilter(item);
									}}
									className={classNames(
										filter === item ? "bg-gray-100 dark:bg-gray-900" : "",
										"flex cursor-pointer items-center gap-3 rounded-md p-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
									)}
								>
									{item}
								</div>
							))}
					</div>
				</Menu>
			</div>
			<div className="y-scroll mt-5 w-full border-collapse overflow-hidden overflow-y-scroll text-sm md:max-h-96">
				<div className="x-scroll w-full overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
					<table className="w-full">
						<thead className="bg-gray-50 dark:bg-gray-700">
							<tr className="border-b border-b-gray-200 text-left text-gray-500 dark:border-b-gray-900 dark:text-gray-300">
								<th>Title</th>
								<th>Type</th>
								<th>Status</th>
								<th>Assigned To</th>
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
								{rows?.length < 1 && <TableNoContent message="No Work Items" />}
								{rows?.length > 0 &&
									rows?.map((item: any) => {
										return (
											<Row
												key={item.id}
												item={item}
												closeMenu={() => setFilterMenu(false)}
											/>
										);
									})}
							</tbody>
						)}
					</table>
				</div>
			</div>
		</>
	);
}

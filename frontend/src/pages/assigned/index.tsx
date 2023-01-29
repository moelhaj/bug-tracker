import { useEffect, useMemo, useRef, useState } from "react";
import { useGetAssignedQuery } from "../../app/features/assignedApi";
import { useUpdateWorkItemMutation } from "../../app/features/workItemsApi";
import Column from "../../components/dnd/Column";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import Header from "./Header";

export default function Assigned() {
	const { data, isFetching, isLoading, isError } = useGetAssignedQuery(undefined, {
		// pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const dragItem = useRef<any>();
	const dragNode = useRef<any>();
	const [dragOver, setDragOver] = useState("");
	const [list, setList] = useState(data);
	const [updateWorkItem] = useUpdateWorkItemMutation();
	const [keyword, setKeyword] = useState("");
	const [filter, setFilter] = useState("");
	const [filterMenu, setFilterMenu] = useState(false);

	useEffect(() => {
		console.log(data);
		if (!isFetching) {
			setList(data);
		}
	}, [isFetching]);

	const handleDragStart = (e: any, item: any) => {
		dragItem.current = item;
		dragNode.current = e.target;
		dragNode.current.addEventListener("dragend", handleDragEnd);
	};

	const handleDragEnd = (e: any) => {
		dragNode.current.removeEventListener("dragend", handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
		setDragOver("");
	};

	const handleDragEnter = async (group: string) => {
		if (dragItem.current.state !== group && group !== "") {
			setList([
				...list?.filter((el: any) => el.id !== dragItem.current.id),
				{ ...dragItem.current, state: group },
			]);
			await updateWorkItem({ ...dragItem.current, state: group });
		}
	};

	const rows = useMemo(() => {
		let items = list;
		if (filter || keyword) {
			items = list?.filter(
				(item: any) =>
					(item.title.toLowerCase().includes(keyword.toLowerCase()) ||
						item.state.toLowerCase().includes(keyword.toLowerCase()) ||
						item.assignee.name.toLowerCase().includes(keyword.toLowerCase())) &&
					item.type.includes(filter)
			);
		}
		return items;
	}, [list, keyword, filter]);

	const filterTypes = ["All", "Task", "Bug"];

	useEffect(() => {
		setFilterMenu(false);
	}, [filter]);

	if (isError)
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);

	return (
		<div className="content-height flex flex-col p-2 dark:bg-gray-900 md:p-3 md:dark:bg-gray-900">
			{isLoading && (
				<div className="grid place-content-center py-40">
					<LoadingSkeleton />
				</div>
			)}

			{!isLoading && list?.length < 1 && (
				<div className="grid place-content-center py-40">
					<NoContentSkeleton message="All clear nothing assigned to you" />
				</div>
			)}

			{!isLoading && list && list?.length > 0 && (
				<>
					<Header
						filter={filter}
						hideMenu={() => setFilterMenu(false)}
						isFetching={isFetching}
						keyword={keyword}
						setKeyword={setKeyword}
						filterMenu={filterMenu}
						setFilterMenu={setFilterMenu}
						filterTypes={filterTypes}
						setFilter={setFilter}
						toggleFilterMenu={() => setFilterMenu((prev: any) => !prev)}
					/>

					<div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden dark:divide-gray-700 lg:grid-cols-3">
						{/* To Do */}
						<Column
							showUser={false}
							title="To Do"
							dragName="New"
							dragOver={dragOver}
							handleDragEnter={handleDragEnter}
							handleDragStart={handleDragStart}
							setDragOver={setDragOver}
							rows={rows.filter((x: any) => x.state === "New")}
						/>
						{/* In Progress */}
						<Column
							showUser={false}
							title="In Progress"
							dragName="InProgress"
							dragOver={dragOver}
							handleDragEnter={handleDragEnter}
							handleDragStart={handleDragStart}
							setDragOver={setDragOver}
							rows={rows.filter((x: any) => x.state === "InProgress")}
						/>
						{/* Done */}
						<Column
							showUser={false}
							title="Done"
							dragName="Done"
							dragOver={dragOver}
							handleDragEnter={handleDragEnter}
							handleDragStart={handleDragStart}
							setDragOver={setDragOver}
							rows={rows.filter((x: any) => x.state === "Done")}
						/>
					</div>
				</>
			)}
		</div>
	);
}

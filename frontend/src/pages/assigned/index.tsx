import { useEffect, useRef, useState } from "react";
import useAssigned from "../../hooks/useAssigned";
import Column from "../../components/dnd/Column";
import Header from "./Header";
import Table from "./Table";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";

export default function Assigned() {
	const { rows, updateList, isError, isLoading, list } = useAssigned();
	const dragItem = useRef<any>();
	const dragNode = useRef<any>();
	const [dragOver, setDragOver] = useState("");

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
			updateList(group, dragItem);
		}
	};

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

			{list?.length < 1 && (
				<div className="grid place-content-center py-40">
					<NoContentSkeleton message="All clear nothing assigned to you" />
				</div>
			)}

			{list?.length > 0 && (
				<>
					<Header />
					<div className="flex lg:hidden">
						<Table />
					</div>

					<div className="hidden flex-1 grid-cols-1 gap-3 overflow-hidden dark:divide-gray-700 lg:grid lg:grid-cols-3">
						{/* To Do */}
						<Column
							showUser={false}
							title="To Do"
							dragName="New"
							dragOver={dragOver}
							handleDragEnter={handleDragEnter}
							handleDragStart={handleDragStart}
							setDragOver={setDragOver}
							rows={rows.filter((x: any) => x.status === "New")}
						/>
						{/* Pending */}
						<Column
							showUser={false}
							title="Pending"
							dragName="Pending"
							dragOver={dragOver}
							handleDragEnter={handleDragEnter}
							handleDragStart={handleDragStart}
							setDragOver={setDragOver}
							rows={rows.filter((x: any) => x.status === "Pending")}
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
							rows={rows.filter((x: any) => x.status === "Done")}
						/>
					</div>
				</>
			)}
		</div>
	);
}

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/store";
import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import classNames from "../../utilities/ClassNames";
import Tooltip from "../../components/elements/Tooltip";
import Column from "../../components/dnd/Column";
import { useUpdateWorkItemMutation } from "../../app/features/workItemsApi";
import { TbBug, TbCheckupList, TbReportAnalytics, TbPlus, TbTemplate, TbX } from "react-icons/tb";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import Metric from "./Metric";

export default function Dashboard() {
	const { data, isLoading, isSuccess, isFetching, isError } = useGetMetricsQuery(undefined, {
		// pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const dragItem = useRef<any>();
	const dragNode = useRef<any>();
	const [dragOver, setDragOver] = useState("");
	const [list, setList] = useState(data?.assignedToMe);
	const [updateWorkItem] = useUpdateWorkItemMutation();
	const { user } = useAppSelector((state: any) => state.auth);

	useEffect(() => {
		if (!isFetching) {
			setList(data?.assignedToMe);
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
		if (dragItem.current.status !== group && group !== "") {
			setList([
				...list?.filter((el: any) => el.id !== dragItem.current.id),
				{ ...dragItem.current, status: group },
			]);
			await updateWorkItem({ ...dragItem.current, status: group });
		}
	};

	if (isError)
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);

	return (
		<div className="content-height flex flex-col p-3 dark:bg-slate-900 md:dark:bg-slate-900">
			{isLoading && (
				<div className="grid place-content-center py-40">
					<LoadingSkeleton />
				</div>
			)}
			{!isLoading && (
				<div className="grid grid-cols-2 gap-5 p-3 md:grid-cols-4">
					<Metric
						icon={<TbReportAnalytics size={20} />}
						name="Projects"
						amount={data?.projectsCount}
					/>
					<Metric icon={<TbTemplate size={20} />} name="PBI" amount={data?.pbiCount} />
					<Metric
						icon={<TbCheckupList size={20} />}
						name="Tasks"
						amount={data?.taskCount}
					/>
					<Metric icon={<TbBug size={20} />} name="Bugs" amount={data?.bugCount} />
				</div>
			)}

			{!isLoading && list?.length < 1 && (
				<div className="grid place-content-center py-40">
					<NoContentSkeleton message="All clear nothing assigned to you" />
				</div>
			)}

			{!isLoading && list?.length > 0 && (
				<h1 className="mt-3 pt-3 pl-4 pr-3 text-lg font-bold">Assigned to me</h1>
			)}
			{!isLoading && list && list?.length > 0 && (
				<div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden p-3 dark:divide-gray-700 lg:grid-cols-3">
					{/* To Do */}
					<Column
						showUser={false}
						title="To Do"
						dragName="New"
						dragOver={dragOver}
						handleDragEnter={handleDragEnter}
						handleDragStart={handleDragStart}
						setDragOver={setDragOver}
						rows={list.filter((x: any) => x.status === "New")}
					/>
					{/* In Progress */}
					<Column
						showUser={false}
						title="In Progress"
						dragName="In Progress"
						dragOver={dragOver}
						handleDragEnter={handleDragEnter}
						handleDragStart={handleDragStart}
						setDragOver={setDragOver}
						rows={list.filter((x: any) => x.status === "In Progress")}
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
						rows={list.filter((x: any) => x.status === "Done")}
					/>
				</div>
			)}
		</div>
	);
}

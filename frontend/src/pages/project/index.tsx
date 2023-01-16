import { useEffect, useMemo, useRef, useState } from "react";
import { TbX } from "react-icons/tb";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import Modal from "../../components/elements/Modal";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../app/features/projectsApi";
import New from "./New";
import { useUpdateWorkItemMutation } from "../../app/features/workItemsApi";
import Column from "../../components/dnd/Column";
import Header from "./Header";

export default function Project() {
	const modalRef = useRef<any>();
	const [keyword, setKeyword] = useState("");
	const [filter, setFilter] = useState("");
	const [filterMenu, setFilterMenu] = useState(false);
	const { projectId } = useParams();
	const {
		data: project,
		isLoading,
		isFetching,
		isError,
	} = useGetProjectQuery(projectId, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const dragItem = useRef<any>();
	const dragNode = useRef<any>();
	const [dragOver, setDragOver] = useState("");
	const [list, setList] = useState(project?.workItems);
	const [updateWorkItem] = useUpdateWorkItemMutation();

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
				...list.filter((el: any) => el.id !== dragItem.current.id),
				{ ...dragItem.current, status: group },
			]);
			await updateWorkItem({ ...dragItem.current, status: group });
		}
	};

	useEffect(() => {
		modalRef?.current?.closeModal();
		if (!isFetching) {
			setList(project?.workItems);
		}
	}, [isFetching]);

	const rows = useMemo(() => {
		let workItems = list;
		if (filter || keyword) {
			workItems = list?.filter(
				(item: any) =>
					(item.title.toLowerCase().includes(keyword.toLowerCase()) ||
						item.status.toLowerCase().includes(keyword.toLowerCase()) ||
						item.assignee.name.toLowerCase().includes(keyword.toLowerCase())) &&
					item.type.includes(filter)
			);
		}
		return workItems;
	}, [list, keyword, filter]);

	const filterTypes = ["All", "PBI", "Task", "Bug"];

	useEffect(() => {
		setFilterMenu(false);
	}, [filter]);

	if (isError)
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);

	if (isLoading)
		return (
			<div className="grid place-content-center py-40">
				<LoadingSkeleton />
			</div>
		);

	return (
		<>
			<Header
				filter={filter}
				hideMenu={() => setFilterMenu(false)}
				isFetching={isFetching}
				keyword={keyword}
				setKeyword={setKeyword}
				filterMenu={filterMenu}
				setFilterMenu={setFilterMenu}
				openModal={() => modalRef.current.openModal()}
				filterTypes={filterTypes}
				setFilter={setFilter}
				toggleFilterMenu={() => setFilterMenu((prev: any) => !prev)}
			/>

			{rows && rows.length < 1 && (
				<div className="flex w-full items-center justify-center py-20">
					<NoContentSkeleton message="No items found" />
				</div>
			)}

			{/* Content */}
			{rows && rows.length > 0 && (
				<div className="relative grid h-4/5 w-full grid-cols-1 gap-3 overflow-hidden p-3 lg:grid-cols-3">
					{/* To Do */}
					<Column
						showUser={true}
						title="To Do"
						dragName="New"
						dragOver={dragOver}
						handleDragEnter={handleDragEnter}
						handleDragStart={handleDragStart}
						setDragOver={setDragOver}
						rows={rows.filter((x: any) => x.status === "New")}
					/>
					{/* In Progress */}
					<Column
						showUser={true}
						title="In Progress"
						dragName="In Progress"
						dragOver={dragOver}
						handleDragEnter={handleDragEnter}
						handleDragStart={handleDragStart}
						setDragOver={setDragOver}
						rows={rows.filter((x: any) => x.status === "In Progress")}
					/>
					{/* Done */}
					<Column
						showUser={true}
						title="Done"
						dragName="Done"
						dragOver={dragOver}
						handleDragEnter={handleDragEnter}
						handleDragStart={handleDragStart}
						setDragOver={setDragOver}
						rows={rows.filter((x: any) => x.status === "Done")}
					/>
				</div>
			)}

			<Modal ref={modalRef}>
				<div className="svg-pattern flex items-center justify-between rounded-t-md py-6 px-3 text-white">
					<h1 className="text-lg font-bold">New Work Item</h1>
					<button onClick={() => modalRef.current.closeModal()}>
						<TbX size={20} />
					</button>
				</div>

				<New projectId={projectId} />
			</Modal>
		</>
	);
}

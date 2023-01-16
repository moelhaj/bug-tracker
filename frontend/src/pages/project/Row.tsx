import React, { useEffect, useRef, useState } from "react";
import { TbBug, TbCheckupList, TbDotsVertical, TbPlus, TbTemplate, TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/elements/Menu";
import { useUpdateWorkItemMutation } from "../../app/features/workItemsApi";
import { useAppSelector, useAppDispatch } from "../../app/store";
import Modal from "../../components/elements/Modal";
import NewWorkItem from "./New";

export default function WorkItem(props: any) {
	const modalRef = useRef<any>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { item, selectedItem, setSelectedItem } = props;
	const { user } = useAppSelector((state: any) => state.auth);
	const isAdmin = user?.roles?.includes("Admin");
	const [menus, setMenus] = useState({ left: false, right: false });
	const [updateWorkItem, { isLoading }] = useUpdateWorkItemMutation();

	useEffect(() => {
		setMenus({ left: false, right: false });
	}, [isLoading]);

	return (
		<tr>
			<td>
				<input
					id="comments"
					name="comments"
					type="checkbox"
					checked={selectedItem?.id === item?.id}
					onChange={() => setSelectedItem(item)}
					className="relative z-20 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
			</td>
			<td className="w-14 grid place-content-center">
				{item.type === "PBI" && item.status !== "New" && item.status !== "Done" ? (
					<Menu
						hide={() => setMenus({ ...menus, left: false })}
						isOpen={menus.left}
						styles="top-10 left-0"
						button={
							<div
								onClick={() => setMenus({ ...menus, left: !menus.left })}
								className="block cursor-pointer text-indigo-600 bg-indigo-100 hover:bg-indigo-200 duration-300 p-2 rounded-md"
							>
								<TbPlus size={15} />
							</div>
						}
					>
						<div className="flex flex-col w-40 p-1">
							<div
								className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
								onClick={() => {
									props.newTask();
									setMenus({ ...menus, left: !menus.left });
								}}
							>
								<TbCheckupList
									className="fill-green-200 stroke-green-600"
									size={18}
								/>{" "}
								<span>Task</span>
							</div>
							<div
								className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
								onClick={() => {
									props.newBug();
									setMenus({ ...menus, left: !menus.left });
								}}
							>
								<TbBug className="fill-rose-200 stroke-rose-600" size={18} />
								<span>Bug</span>
							</div>
						</div>
					</Menu>
				) : null}
			</td>
			<td>{item.title}</td>
			<td>{item.status}</td>
			<td>
				{item.type === "Task" ? (
					<span className="flex leading-3 items-center gap-1">
						<TbCheckupList className="fill-green-200 stroke-green-600" size={18} />{" "}
						{item.type}
					</span>
				) : item.type === "Bug" ? (
					<span className="flex leading-3 items-center gap-1 rounded-md p-1">
						<TbBug className="fill-rose-200 stroke-rose-600" size={18} /> {item.type}
					</span>
				) : (
					<span className="flex leading-3 items-center gap-1 rounded-md p-1">
						<TbTemplate className="fill-indigo-200 stroke-indigo-600" size={18} />{" "}
						{item.type}
					</span>
				)}
			</td>
			<td className="flex items-center gap-3">
				<img
					className="object-contain h-6 w-6 rounded-full"
					src={`http://localhost:3500/${item.assignee?.id}.png`}
					crossOrigin="anonymous"
					alt="avatar"
				/>
				{item.assignee.name}
			</td>
			<td className="w-14">
				{(item.type === "PBI" && !isAdmin) || item.status === "Done" ? null : (
					<Menu
						hide={() => setMenus({ ...menus, right: false })}
						isOpen={menus.right}
						styles="top-10 right-0 p-1 flex flex-col"
						button={
							<div
								onClick={() => setMenus({ ...menus, right: !menus.right })}
								className="block cursor-pointer bg-gray-50 hover:bg-gray-100 duration-300 p-2 rounded-md"
							>
								<TbDotsVertical size={15} />
							</div>
						}
					>
						<div className="w-32 p-1">
							{item.type === "PBI" && item.status === "New" && isAdmin && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() => updateWorkItem({ ...item, status: "Committed" })}
								>
									Commit
								</div>
							)}

							{item.type === "PBI" && item.status === "Committed" && isAdmin && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() => updateWorkItem({ ...item, status: "Done" })}
								>
									Done
								</div>
							)}

							{item.type === "Task" && item.status === "To Do" && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() =>
										updateWorkItem({ ...item, status: "In Progress" })
									}
								>
									In Progress
								</div>
							)}

							{item.type === "Task" && item.status === "In Progress" && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() => updateWorkItem({ ...item, status: "Done" })}
								>
									Done
								</div>
							)}
							{/* Bug */}
							{item.type === "Bug" && item.status === "New" && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() => updateWorkItem({ ...item, status: "Resolved" })}
								>
									Resolve
								</div>
							)}
							{item.type === "Bug" && item.status === "Resolved" && (
								<div
									className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 duration-300"
									onClick={() => updateWorkItem({ ...item, status: "Done" })}
								>
									Done
								</div>
							)}
						</div>
					</Menu>
				)}
			</td>
		</tr>
	);
}

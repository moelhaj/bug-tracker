import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../app/features/usersApi";
import { useAddWorkItemMutation } from "../../app/features/workItemsApi";
import Menu from "../../components/elements/Menu";
import Textarea from "../../components/form/Textarea";
import TextInput from "../../components/form/TextInput";
import Select from "../../components/form/Select";
import UserSelect from "../../components/form/UserSelect";
import Button from "../../components/elements/Button";
import useNotification from "../../hooks/useNotification";

type IWorkItem = {
	title: string;
	details: string;
	type: string | null | undefined;
	projectId: string | null | undefined;
	assigneeId: string;
	assigneeName: string;
	status: string;
	pbi?: string;
};

export default function NewWorkItem(props: any) {
	const { notify } = useNotification();
	const { data: users, isLoading: loadingUsers } = useGetUsersQuery("");
	const [addWorkItem, { isLoading }] = useAddWorkItemMutation();
	const [error, setError] = useState<any>(null);
	const [workItem, setWorkItem] = useState<IWorkItem>({
		title: "",
		details: "",
		type: "",
		projectId: props.projectId,
		assigneeId: "",
		assigneeName: "",
		status: "New",
	});

	// useEffect(() => {
	// 	props.type === "Bug" && setWorkItem({ ...workItem, status: "New" });
	// 	props.type === "Task" && setWorkItem({ ...workItem, status: "To Do" });
	// 	props.type === "PBI" && setWorkItem({ ...workItem, status: "New" });
	// }, []);

	const handleChange = (e: { target: { id: any; value: any } }) => {
		setWorkItem({ ...workItem, [e.target.id]: e.target.value });
	};

	const handleSubmit = async () => {
		// workItem title
		if (workItem.title === "") {
			return setError({ target: "title", message: "Required Field" });
		}
		// workItem type
		if (workItem.type === "") {
			return setError({ target: "type", message: "Required Field" });
		}
		// workItem assigneeId
		if (workItem.assigneeId === "") {
			return setError({ target: "assigneeId", message: "Required Field" });
		}
		// workItem details
		if (workItem.details === "") {
			return setError({ target: "details", message: "Required Field" });
		}
		// send notification
		await notify(workItem.assigneeId);
		await addWorkItem(workItem);
	};

	return (
		<div className="flex h-4/6 w-full flex-col p-3">
			{/* WorkItem title */}
			<div className="mt-9">
				<TextInput
					type="text"
					required
					id="title"
					fullWidth
					value={workItem.title}
					label="Title"
					handleChange={handleChange}
					error={error?.target === "title"}
					errorMessage={error?.message}
				/>
				{/* WorkItem assignee */}
				{error?.target === "assigneeId" && (
					<p className="my-3 w-40 rounded-md bg-rose-100 p-1 pl-3 text-sm text-rose-600">
						{error?.message}
					</p>
				)}
			</div>
			{/* Type */}
			<div className="mt-9">
				<Select
					label="Work Item Type"
					selected={workItem.type}
					setSelected={(item: any) => setWorkItem({ ...workItem, type: item })}
					fullWidth
					items={["PBI", "Task", "Bug"]}
				/>
			</div>
			{/* Assignee */}
			<div className="mt-9">
				{loadingUsers && (
					<div className="w-full animate-pulse bg-gray-100 p-2 text-center dark:bg-slate-800">
						Loading Users
					</div>
				)}
				{!loadingUsers && (
					<UserSelect
						label="Assignee To"
						setUser={(user: any) =>
							setWorkItem({
								...workItem,
								assigneeId: user.id,
								assigneeName: user.name,
							})
						}
						user={{
							assigneeId: workItem.assigneeName,
							assigneeName: workItem.assigneeName,
						}}
						users={users}
					/>
				)}
			</div>

			<div className="mt-9">
				<Textarea
					rows={7}
					id="details"
					value={workItem.details}
					handleChange={handleChange}
					label="Details"
					required
					fullWidth
					error={error?.target === "details"}
					errorMessage={error?.message}
					styles="w-full mt-2"
				></Textarea>
				{error?.target === "details" && (
					<p className="pl-3 text-sm text-rose-600">{error?.message}</p>
				)}
			</div>

			<div className="mt-9 flex items-center justify-end">
				<Button disabled={isLoading} primary handleClick={handleSubmit}>
					Add
				</Button>
			</div>
		</div>
	);
}

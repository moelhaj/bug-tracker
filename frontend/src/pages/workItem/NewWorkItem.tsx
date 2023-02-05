import { useState } from "react";
import { useGetUsersQuery } from "../../app/features/usersApi";
import UserSelect from "../../components/form/UserSelect";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";
import Select from "../../components/form/Select";
import useNotification from "../../hooks/useNotification";
import { useAddWorkItemMutation } from "../../app/features/workItemsApi";
import { modal } from "../../components/elements/Animation";
import useWorkItem from "../../hooks/useProject";

type WorkItem = {
	title: string;
	details: string;
	type: string;
	assigneeId: string;
	assigneeName: string;
	storyId: string | undefined;
};

const types = ["Task", "Bug"];

export default function New({ storyId }: { storyId: string | undefined }) {
	const { notify } = useNotification();
	const { modals, setModals } = useWorkItem();
	const { data: users, isLoading: loadingUsers } = useGetUsersQuery(undefined);
	const [addWorkItem, { isLoading }] = useAddWorkItemMutation();
	const [error, setError] = useState<any>(null);
	const [workItem, setWorkItem] = useState<WorkItem>({
		title: "",
		details: "",
		type: "",
		assigneeId: "",
		assigneeName: "",
		storyId: storyId,
	});

	const handleChange = (e: { target: { id: any; value: any } }) => {
		setWorkItem({ ...workItem, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
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
		<div className="fixed inset-0 z-10">
			{modals.newWorkItem && <div className="fixed inset-0 bg-black bg-opacity-70"></div>}
			<motion.div
				className="relative inset-0 z-30 flex h-full w-full items-center justify-center p-3"
				initial="exit"
				animate={modals.newWorkItem ? "enter" : "exit"}
				variants={modal}
			>
				<div className="w-11/12 max-w-full rounded-md bg-white dark:bg-gray-900 md:w-10/12 lg:w-8/12 xl:w-6/12">
					<div className="svg-pattern flex items-center justify-between rounded-t-md py-4 px-3 text-white">
						<h1 className="text-lg font-bold">New Work Item</h1>
						<button onClick={() => setModals({ ...modals, newWorkItem: false })}>
							<TbX size={20} />
						</button>
					</div>
					<div className="mt-5 p-4">
						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							{/* work item title */}
							<div className="w-full">
								<input
									autoFocus={modals.newWorkItem}
									type="text"
									id="title"
									required
									value={workItem.title}
									placeholder="Title"
									onChange={handleChange}
									className="input w-full"
								/>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "title" && error?.message}
								</div>
							</div>

							{/* work item type */}
							<div className="w-full">
								<Select
									items={types}
									label="Type"
									selected={workItem.type}
									setSelected={(type: string) =>
										setWorkItem({ ...workItem, type })
									}
								/>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "type" && error?.message}
								</div>
							</div>

							{/* workItem assigned to */}
							<div className="w-full">
								{loadingUsers && (
									<div className="w-full animate-pulse rounded-md border border-gray-300 bg-gray-50 px-2 py-1 dark:bg-gray-800">
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
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "assigneeId" && error?.message}
								</div>
							</div>

							{/* workItem details */}
							<div className="w-full">
								<textarea
									rows={7}
									id="details"
									value={workItem.details}
									onChange={handleChange}
									placeholder="Details"
									required
									className="input w-full"
								></textarea>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "details" && error?.message}
								</div>
							</div>

							<div className="flex w-full justify-end">
								<button
									disabled={isLoading}
									type="submit"
									className="btn btn-primary px-3 py-1"
								>
									Add
								</button>
							</div>
						</form>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

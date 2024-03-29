import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../app/features/usersApi";
import UserSelect from "../../components/form/UserSelect";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";
import { useUpdateStoryMutation } from "../../app/features/storiesApi";
import { modal } from "../../components/elements/Animation";
import useProject from "../../hooks/useProject";
import classNames from "../../utilities/ClassNames";

type Story = {
	id: string;
	title: string;
	details: string;
	assigneeId: string;
	assigneeName: string;
	projectId: string | undefined;
};

export default function EditStory({
	currentProject,
	selectedStory,
}: {
	currentProject: string | undefined;
	selectedStory: any;
}) {
	const { modals, setModals } = useProject();
	const { data: users, isLoading: loadingUsers } = useGetUsersQuery(undefined);
	const [updateStory, { isLoading }] = useUpdateStoryMutation();
	const [tab, setTab] = useState("details");
	const [error, setError] = useState<any>(null);
	const [story, setStory] = useState<Story>({
		id: selectedStory.id,
		title: selectedStory.title,
		details: selectedStory.details,
		assigneeId: selectedStory.assignee.id,
		assigneeName: selectedStory.assignee.name,
		projectId: currentProject,
	});

	const handleChange = (e: { target: { id: any; value: any } }) => {
		setStory({ ...story, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// story title
		if (story.title === "") {
			return setError({ target: "title", message: "Required Field" });
		}
		// story assigneeId
		if (story.assigneeId === "") {
			return setError({ target: "assigneeId", message: "Required Field" });
		}
		// story details
		if (story.details === "") {
			return setError({ target: "details", message: "Required Field" });
		}
		// send notification
		await updateStory(story);
	};

	return (
		<div className="fixed inset-0 z-10">
			{modals.editStory && <div className="fixed inset-0 bg-black bg-opacity-70"></div>}
			<motion.div
				className="relative inset-0 z-30 flex h-full w-full items-center justify-center p-3"
				initial="exit"
				animate={modals.editStory ? "enter" : "exit"}
				variants={modal}
			>
				<div className="w-11/12 max-w-full rounded-md bg-white dark:bg-gray-900 md:w-10/12 lg:w-8/12 xl:w-6/12">
					<div className="svg-pattern flex items-center justify-between rounded-t-md py-4 px-3 text-white">
						<h1 className="text-lg font-bold">Update User Story</h1>
						<button onClick={() => setModals({ ...modals, editStory: false })}>
							<TbX size={20} />
						</button>
					</div>
					<div className="mt-5 p-4">
						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							{/* work item title */}
							<div className="w-full">
								<input
									autoFocus={modals.editStory}
									type="text"
									id="title"
									required
									value={story.title}
									placeholder="Title"
									onChange={handleChange}
									className="input w-full"
								/>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "title" && error?.message}
								</div>
							</div>

							{/* story assigned to */}
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
											setStory({
												...story,
												assigneeId: user.id,
												assigneeName: user.name,
											})
										}
										user={{
											assigneeId: story.assigneeName,
											assigneeName: story.assigneeName,
										}}
										users={users}
									/>
								)}
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "assigneeId" && error?.message}
								</div>
							</div>

							{/* story details */}
							<div className="w-full">
								<textarea
									rows={7}
									id="details"
									value={story.details}
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
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

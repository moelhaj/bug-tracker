import { useState } from "react";
import { useAddProductBacklogItemMutation } from "../../app/features/productBacklogItemApi";
import { useGetUsersQuery } from "../../app/features/usersApi";
import UserSelect from "../../components/form/UserSelect";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";
import Select from "../../components/form/Select";
import useNotification from "../../hooks/useNotification";

type PBI = {
	title: string;
	details: string;
	tag: string;
	assigneeId: string;
	assigneeName: string;
	projectId: string;
};

const tags = ["Backend", "Frontend", "UX/UI Design"];

export default function NewPbi(props: any) {
	const { notify } = useNotification();
	const [step, setStep] = useState(1);
	const [error, setError] = useState<any>(null);
	const { data: users, isLoading: loadingUsers } = useGetUsersQuery("");
	const [addProductBacklogItem, { isLoading }] = useAddProductBacklogItemMutation();
	const [pbi, setPbi] = useState<PBI>({
		title: "",
		details: "",
		tag: "",
		assigneeId: "",
		assigneeName: "",
		projectId: props.projectId,
	});

	const handleChange = (e: { target: { id: any; value: any } }) => {
		setPbi({ ...pbi, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await notify(pbi.assigneeId);
		await addProductBacklogItem(pbi);
	};

	const appearAnimation = {
		enter: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
			display: "flex",
		},
		exit: {
			opacity: 0,
			y: 10,
			transition: {
				duration: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	return (
		<div className="fixed inset-0 z-10">
			{props.open && <div className="fixed inset-0 bg-black bg-opacity-70"></div>}
			<motion.div
				className="relative inset-0 z-30 flex h-full w-full items-center justify-center p-3"
				initial="exit"
				animate={props.open ? "enter" : "exit"}
				variants={appearAnimation}
			>
				<div className="w-11/12 max-w-full rounded-md bg-white dark:bg-slate-900 md:w-10/12 lg:w-8/12 xl:w-6/12">
					<div className="svg-pattern flex items-center justify-between rounded-t-md py-6 px-3 text-white">
						<h1 className="text-lg font-bold">New Product Backlog Item</h1>
						<button onClick={props.close}>
							<TbX size={20} />
						</button>
					</div>
					<div className="mt-5 p-4">
						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							{/* Pbi title */}
							<div className="w-full">
								<input
									autoFocus={props.open}
									type="text"
									id="title"
									required
									value={pbi.title}
									placeholder="Title"
									onChange={handleChange}
									className="input w-full"
								/>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "title" && error?.message}
								</div>
							</div>

							{/* Pbi assigned to */}
							<div className="w-full">
								{loadingUsers && (
									<div className="w-full animate-pulse rounded-md border border-gray-300 bg-gray-50 px-2 py-1 dark:bg-slate-800">
										Loading Users
									</div>
								)}
								{!loadingUsers && (
									<UserSelect
										label="Assignee To"
										setUser={(user: any) =>
											setPbi({
												...pbi,
												assigneeId: user.id,
												assigneeName: user.name,
											})
										}
										user={{
											assigneeId: pbi.assigneeName,
											assigneeName: pbi.assigneeName,
										}}
										users={users}
									/>
								)}
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "assigneeId" && error?.message}
								</div>
							</div>

							{/* Pbi tag */}
							<div className="w-full">
								<Select
									items={tags}
									label="Tag"
									selected={pbi.tag}
									setSelected={(tag: string) => setPbi({ ...pbi, tag })}
								/>
								<div className="mt-1 h-2 px-2 text-sm text-rose-600">
									{error?.target === "title" && error?.message}
								</div>
							</div>

							{/* Project details */}
							<div className="w-full">
								<textarea
									rows={7}
									id="details"
									value={pbi.details}
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

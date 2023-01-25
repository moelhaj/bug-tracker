import { useEffect, useState } from "react";
import { useAddProjectMutation } from "../../app/features/projectsApi";
import { useGetUsersQuery } from "../../app/features/usersApi";
import Stepper from "../../components/form/Stepper";
import UsersSelect from "../../components/form/UsersSelect";
import DatePicker from "../../components/form/DatePicker";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";

type Project = {
	title: string;
	details: string;
	startDate: string;
	endDate: string;
	users: string[];
};

export default function NewProject(props: any) {
	const [step, setStep] = useState(1);
	const [error, setError] = useState<any>(null);
	const steps = ["Project Details", "Project Team"];
	const [selectedUsers, setSelectedUsers] = useState<any>([]);
	const { data: users } = useGetUsersQuery("");
	const [addNewProject, { isLoading }] = useAddProjectMutation();
	const [project, setProject] = useState<Project>({
		title: "",
		details: "",
		startDate: "",
		endDate: "",
		users: [],
	});
	const handleChange = (e: { target: { id: any; value: any } }) => {
		setProject({ ...project, [e.target.id]: e.target.value });
	};
	const prevStep = () => (step !== 1 ? setStep(step - 1) : null);

	const nextStep = () => {
		if (step === 1) {
			// project title
			if (project.title === "") {
				return setError({ target: "title", message: "Required Field" });
			}
			// project start date
			if (project.startDate === "") {
				return setError({ target: "startDate", message: "Required Field" });
			}
			// project end date
			if (project.endDate === "") {
				return setError({ target: "endDate", message: "Required Field" });
			}
			// project details
			if (project.details === "") {
				return setError({ target: "details", message: "Required Field" });
			}

			setError({ target: "", message: "" });
			setStep(2);
		}
	};

	const handleSubmit = async () => {
		if (project.users.length > 0) {
			await addNewProject(project);
		} else {
			return setError({ target: "team", message: "No team member selected" });
		}
	};

	useEffect(() => {
		setProject({ ...project, users: selectedUsers.map((user: any) => user.id) });
	}, [selectedUsers]);

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
						<h1 className="text-lg font-bold">New Project</h1>
						<button onClick={props.close}>
							<TbX size={20} />
						</button>
					</div>
					<div className="p-4">
						<Stepper
							step={step}
							steps={steps}
							loading={isLoading}
							submitText="Add Project"
							nextStep={nextStep}
							prevStep={prevStep}
							handleSubmit={handleSubmit}
						>
							<form className="mt-5 md:mt-10">
								{step === 1 && (
									<div className="flex flex-col gap-3 md:gap-7">
										{/* Project title */}
										<div className="w-full">
											<input
												autoFocus={props.open}
												type="text"
												id="title"
												required
												value={project.title}
												placeholder="Title"
												onChange={handleChange}
												className="input w-full"
											/>
											<div className="mt-1 h-2 px-2 text-sm text-rose-600">
												{error?.target === "title" && error?.message}
											</div>
										</div>

										{/* Project dates */}
										<div className="flex flex-col items-center gap-10 md:flex-row">
											<div className="w-full">
												<DatePicker
													label="Start Date"
													date={project.startDate}
													setDate={(value: string) =>
														setProject({ ...project, startDate: value })
													}
												/>
												<div className="mt-1 h-2 px-2 text-sm text-rose-600">
													{error?.target === "startDate" &&
														error?.message}
												</div>
											</div>
											<div className="w-full">
												<DatePicker
													label="End Date"
													date={project.endDate}
													setDate={(value: string) =>
														setProject({ ...project, endDate: value })
													}
												/>
												<div className="mt-1 h-2 px-2 text-sm text-rose-600">
													{error?.target === "endDate" && error?.message}
												</div>
											</div>
										</div>

										{/* Project details */}
										<div className="w-full">
											<textarea
												rows={7}
												id="details"
												value={project.details}
												onChange={handleChange}
												placeholder="Details"
												required
												className="input w-full"
											></textarea>
											<div className="mt-1 h-2 px-2 text-sm text-rose-600">
												{error?.target === "details" && error?.message}
											</div>
										</div>
									</div>
								)}
								{step === 2 && (
									<div className="w-full justify-center">
										{error?.target === "team" && (
											<div className="grid place-content-center">
												<p className="-mt-10 mb-2 h-7 p-1 pl-3 text-sm text-rose-600">
													{error?.message}
												</p>
											</div>
										)}
										<UsersSelect
											label="Team Members"
											users={users}
											selectedUsers={selectedUsers}
											setSelectedUsers={setSelectedUsers}
										/>
									</div>
								)}
							</form>
						</Stepper>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

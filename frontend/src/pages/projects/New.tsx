import React, { useEffect, useState } from "react";
import { useAddProjectMutation } from "../../app/features/projectsApi";
import { useGetUsersQuery } from "../../app/features/usersApi";
import Stepper from "../../components/form/Stepper";
import Textarea from "../../components/form/Textarea";
import TextInput from "../../components/form/TextInput";
import UsersSelect from "../../components/form/UsersSelect";

type Project = {
	title: string;
	details: string;
	users: string[];
};

export default function New(props: any) {
	const [step, setStep] = useState(1);
	const [error, setError] = useState<any>(null);
	const steps = ["Project Details", "Project Team"];
	const [selectedUsers, setSelectedUsers] = useState<any>([]);
	const { data: users } = useGetUsersQuery("");
	const [addNewProject, { isLoading }] = useAddProjectMutation();
	const [project, setProject] = useState<Project>({
		title: "",
		details: "",
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

	return (
		<div className="mt-5 w-full p-3">
			<Stepper
				step={step}
				steps={steps}
				loading={isLoading}
				submitText="Add Project"
				nextStep={nextStep}
				prevStep={prevStep}
				handleSubmit={handleSubmit}
			>
				<div className="mt-10">
					<form>
						{step === 1 && (
							<div className="flex flex-col">
								<TextInput
									type="text"
									required
									id="title"
									value={project.title}
									label="Project Title"
									fullWidth
									handleChange={handleChange}
									error={error?.target === "title"}
									errorMessage={error?.message}
								/>
								<div className="mt-7">
									<Textarea
										rows={7}
										id="details"
										value={project.details}
										handleChange={handleChange}
										label="Project Details"
										fullWidth
										required
										error={error?.target === "details"}
										errorMessage={error?.message}
									></Textarea>
								</div>
							</div>
						)}
						{step === 2 && (
							<div className="mt-3 w-full justify-center">
								{error?.target === "team" && (
									<div className="grid place-content-center">
										<p className="rounded-md bg-rose-100 p-1 pl-3 text-sm text-rose-600">
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
				</div>
			</Stepper>
		</div>
	);
}

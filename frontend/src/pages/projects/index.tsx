import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../app/features/projectsApi";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import { TbPlus } from "react-icons/tb";
import NewProject from "./NewProject";
import { useAppSelector } from "../../app/store";
import ProjectBlock from "./ProjectBlock";

export default function Dashboard() {
	const { user } = useAppSelector((state: any) => state.user);
	const {
		data: projects,
		isLoading,
		isFetching,
		isError,
	} = useGetProjectsQuery(undefined, {
		refetchOnFocus: true,
	});
	const [newProject, setNewProject] = useState(false);

	useEffect(() => {
		setNewProject(false);
	}, [isFetching]);

	if (isError) {
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="grid place-content-center py-40">
				<LoadingSkeleton />
			</div>
		);
	}

	return (
		<>
			<div className="p-2 md:p-3">
				{/* Header */}
				<h1 className="mt-10 pl-1 text-lg font-bold">Projects</h1>

				{/* Empty */}
				{projects && projects?.length < 1 && (
					<div className="grid place-content-center py-40">
						<NoContentSkeleton message="No Projects" />
					</div>
				)}

				{projects && projects?.length > 0 && (
					<div className="dashboard-height large-y-scroll mt-3 overflow-hidden overflow-y-scroll rounded-md pt-1">
						<div className="grid grid-flow-row auto-rows-max grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
							{[...projects, { last: true }].map((project: any) => {
								if (project.last) {
									if (user.roles.includes("admin")) {
										return (
											<div
												onClick={() => setNewProject(true)}
												key="last-project"
												className="project-card-height flex cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-3 text-gray-300 shadow-sm duration-300 hover:bg-gray-50 hover:text-gray-700 dark:border-none dark:bg-gray-800 dark:text-gray-600 dark:hover:text-gray-300"
											>
												<TbPlus size={50} />
											</div>
										);
									} else {
										return null;
									}
								} else {
									return <ProjectBlock key={project.id} project={project} />;
								}
							})}
						</div>
					</div>
				)}
			</div>
			{newProject && <NewProject open={newProject} close={() => setNewProject(false)} />}
		</>
	);
}

import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../app/features/projectsApi";
import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import { TbBug, TbCheckupList, TbReportAnalytics, TbPlus, TbTemplate } from "react-icons/tb";
import NewProject from "./NewProject";
import { useNavigate } from "react-router-dom";
import RelativeTime from "../../utilities/RelativeTime";
import TextOverflow from "../../utilities/TextOverflow";
import { useAppSelector } from "../../app/store";
import Metric from "./Metric";

export default function Dashboard() {
	const { user } = useAppSelector((state: any) => state.user);
	const navigate = useNavigate();
	const { data: metrics, isLoading: metricsIsLoading } = useGetMetricsQuery(undefined, {
		// pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
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

	if (metricsIsLoading || isLoading || isFetching) {
		return (
			<div className="grid place-content-center py-40">
				<LoadingSkeleton />
			</div>
		);
	}

	return (
		<>
			<div className="p-3">
				{metrics && (
					<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
						<Metric
							icon={<TbReportAnalytics size={20} />}
							name="Projects"
							amount={metrics?.projectsCount}
						/>
						<Metric
							icon={<TbCheckupList size={20} />}
							name="Tasks"
							amount={metrics?.taskCount}
						/>
						<Metric icon={<TbBug size={20} />} name="Bugs" amount={metrics?.bugCount} />
					</div>
				)}
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
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
							{[...projects, { last: true }].map((project: any) => {
								// console.log(project.last);
								// return <div>test</div>;
								if (project.last) {
									if (user.roles.includes("admin")) {
										return (
											<div
												onClick={() => setNewProject(true)}
												key="last-project"
												className="project-card-height flex cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-3 text-gray-300 shadow-sm duration-300 hover:bg-gray-50 hover:text-gray-700 dark:border-none dark:bg-slate-800 dark:text-gray-600 dark:hover:text-gray-300"
											>
												<TbPlus size={50} />
											</div>
										);
									} else {
										return null;
									}
								} else {
									return (
										<div
											key={project.id}
											onClick={() => navigate(`/project/${project.id}`)}
											className="flex cursor-pointer flex-col rounded-md border bg-white p-3 shadow-sm duration-300 hover:bg-gray-50 dark:border-none dark:bg-slate-800"
										>
											<h1 className="text-lg font-bold">{project.title}</h1>
											<p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
												{TextOverflow(project.details, 7)}...
											</p>
											<div className="flex-1" />
											<div className="x-scroll my-3 flex items-center gap-3 overflow-hidden overflow-x-scroll">
												{project.users.map((user: any) => (
													<img
														key={user.id}
														className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-slate-900"
														crossOrigin="anonymous"
														src={`https://mo-backend-issue-tracker.onrender.com/${user?.id}.png`}
														alt={"user"}
													/>
												))}
											</div>
											<div className="flex justify-between">
												<div className="flex items-center gap-2 text-sm">
													<div className="text-indigo-600 dark:text-indigo-300">
														<TbTemplate size={15} />
													</div>
													<p>{project?._count.workItems}</p>
												</div>
												<p className="text-sm">
													Due {RelativeTime(project.endDate)}
												</p>
											</div>
										</div>
									);
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

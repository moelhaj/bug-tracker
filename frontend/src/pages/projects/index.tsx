import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../app/features/projectsApi";
import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";
import { TbBug, TbCheckupList, TbReportAnalytics, TbTemplate } from "react-icons/tb";
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
					<div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
						<Metric
							icon={<TbReportAnalytics size={20} />}
							name="Projects"
							amount={metrics?.projectsCount}
						/>
						<Metric
							icon={<TbTemplate size={20} />}
							name="PBI"
							amount={metrics?.pbiCount}
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
				<div className="mt-5 flex items-center">
					<h1 className="text-xl font-bold">Projects</h1>
					<div className="flex-1" />
					{user.roles.includes("admin") && (
						<button
							onClick={() => setNewProject(true)}
							className="btn btn-primary px-2 py-1"
						>
							New Project
						</button>
					)}
				</div>

				{/* Empty */}
				{projects && projects?.length < 1 && (
					<div className="grid place-content-center py-40">
						<NoContentSkeleton message="No Projects" />
					</div>
				)}

				{projects && projects?.length > 0 && (
					<div className="dashboard-height large-y-scroll mt-3 grid grid-cols-1 gap-3 overflow-hidden overflow-y-scroll rounded-md pt-3 pb-3 dark:bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
						{projects.map((project: any) => (
							<div
								key={project.id}
								onClick={() => navigate(`/project/${project.id}`)}
								className="flex cursor-pointer flex-col rounded-md border bg-white p-3 shadow-sm duration-300 hover:bg-gray-50 dark:border-none dark:bg-slate-900"
							>
								<h1 className="text-lg font-bold">{project.title}</h1>
								<p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
									{TextOverflow(project.details, 7)}...
								</p>
								<div className="x-scroll my-3 flex items-center gap-3 overflow-hidden overflow-x-scroll">
									{project.users.map((user: any) => (
										<img
											key={user.id}
											className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-slate-900"
											crossOrigin="anonymous"
											src={`http://localhost:3500/${user?.id}.png`}
											alt={"user"}
										/>
									))}
								</div>
								<p className="text-sm">Due {RelativeTime(project.endDate)}</p>
							</div>
						))}
					</div>
				)}
			</div>
			{newProject && <NewProject open={newProject} close={() => setNewProject(false)} />}
		</>
	);
}

import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import { ErrorSkeleton, LoadingSkeleton } from "../../components/elements/Skeletons";
import { TbBug, TbCheckupList, TbListDetails } from "react-icons/tb";
import { BugIcon, TaskIcon } from "../../components/elements/Icons";
import Metric from "./Metric";
import { useEffect } from "react";
import Row from "./Row";

export default function Dashboard() {
	const { data, isLoading, isError } = useGetMetricsQuery(undefined, {
		pollingInterval: 900000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		console.log(data);
	}, [data]);

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
		<div className="p-2 md:p-3">
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
				<Metric
					icon={<TbListDetails size={20} />}
					name="Projects"
					amount={data?.projectsCount}
				/>
				<Metric icon={<TbCheckupList size={20} />} name="Tasks" amount={data?.taskCount} />
				<Metric icon={<TbBug size={20} />} name="Bugs" amount={data?.bugCount} />
			</div>
			<div className="mt-5 flex flex-col gap-5 md:mt-20 md:flex-row">
				<div className="flex-1">
					<div className="flex items-center gap-1">
						<TaskIcon size={20} />
						<h1 className="text-xl font-bold">Latest Tasks</h1>
					</div>
					<div className="mt-3 flex flex-col gap-3">
						{data?.tasks.map((task: any) => (
							<Row key={task.id} item={task} />
						))}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-1">
						<BugIcon size={20} />
						<h1 className="text-xl font-bold">Latest Bugs</h1>
					</div>
					<div className="mt-3 flex flex-col gap-3">
						{data?.bugs.map((bug: any) => (
							<Row key={bug.id} item={bug} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

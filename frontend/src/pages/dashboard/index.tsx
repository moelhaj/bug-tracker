import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import { ErrorSkeleton, LoadingSkeleton } from "../../components/elements/Skeletons";
import { TbBug, TbCheckupList, TbListDetails, TbTemplate } from "react-icons/tb";
import { BugIcon, TaskIcon, StoryIcon } from "../../components/elements/Icons";
import Metric from "./Metric";
import { useEffect } from "react";
import Block from "./Block";

export default function Dashboard() {
	const { data, isLoading, isError } = useGetMetricsQuery(undefined, {
		pollingInterval: 900000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

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
			<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
				<Metric
					icon={<TbListDetails size={20} />}
					name="Projects"
					amount={data?.projectsCount}
				/>
				<Metric
					icon={<TbTemplate size={20} />}
					name="Stories"
					amount={data?.storiesCount}
				/>
				<Metric icon={<TbCheckupList size={20} />} name="Tasks" amount={data?.taskCount} />
				<Metric icon={<TbBug size={20} />} name="Bugs" amount={data?.bugCount} />
			</div>
			<div className="flex flex-col gap-5 md:mt-20 md:flex-row">
				<Block
					type="stories"
					title="Latest Stories"
					data={data?.stories}
					icon={<StoryIcon size={23} />}
				/>
				<Block
					type="tasks"
					title="Latest Tasks"
					data={data?.tasks}
					icon={<TaskIcon size={23} />}
				/>
				<Block
					type="bugs"
					title="Latest Bugs"
					data={data?.bugs}
					icon={<BugIcon size={23} />}
				/>
			</div>
		</div>
	);
}

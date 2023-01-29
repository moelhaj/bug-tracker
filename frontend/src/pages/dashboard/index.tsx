import { useGetMetricsQuery } from "../../app/features/dashboardApi";
import { ErrorSkeleton, LoadingSkeleton } from "../../components/elements/Skeletons";
import { TbBug, TbCheckupList, TbReportAnalytics } from "react-icons/tb";
import Metric from "./Metric";

export default function Dashboard() {
	const {
		data: metrics,
		isLoading,
		isError,
	} = useGetMetricsQuery(undefined, {
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
		<div className="p-1 md:p-3">
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
		</div>
	);
}

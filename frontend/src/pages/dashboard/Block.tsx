import { TbFileAlert } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";

type Props = {
	icon: any;
	data: any;
	title: string;
	type: string;
};

export default function Block({ data, icon, title, type }: Props) {
	return (
		<div className="flex-1 rounded-md p-3 dark:bg-gray-800">
			<div className="flex items-center gap-1">
				{icon}
				<h1 className="text-lg font-bold">{title}</h1>
			</div>
			{data?.length < 1 && (
				<div className="mt-3 flex flex-col items-center gap-3 rounded-md border border-gray-200 bg-white py-10 text-sm text-gray-400 dark:border-none dark:bg-gray-700">
					<p className="">{`No ${type} found`}</p>
				</div>
			)}
			<div className="mt-3 flex flex-col gap-3">
				{data?.map((item: any) => (
					<div
						key={item.id}
						className="rounded-md border border-gray-200 bg-white p-3 dark:border-none dark:bg-gray-900"
					>
						<p className="text-lg font-bold">{item.title}</p>
						<p className="text-sm text-gray-600 dark:text-gray-300">{item.status}</p>
						<div className="mt-3 flex items-center gap-1">
							<img
								className="h-5 w-5 rounded-full object-contain"
								src={`https://mo-backend-issue-tracker.onrender.com/${item.assignee?.id}.png`}
								crossOrigin="anonymous"
								alt="avatar"
							/>
							<p className="text-sm text-gray-600 dark:text-gray-200">
								{item.assignee?.name}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

import React from "react";

export default function Row(props: any) {
	const { item } = props;
	return (
		<div className="rounded-md border border-gray-200 bg-white p-3 dark:border-none dark:bg-gray-800">
			<p className="text-lg font-bold">{item.title}</p>
			<p className="text-sm text-gray-600 dark:text-gray-300">{item.state}</p>
			<div className="mt-2 flex items-center gap-1">
				<img
					className="h-5 w-5 rounded-full object-contain"
					src={`https://mo-backend-issue-tracker.onrender.com/${item.assignee?.id}.png`}
					crossOrigin="anonymous"
					alt="avatar"
				/>
				<p className="text-sm text-gray-600 dark:text-gray-200">{item.assignee?.name}</p>
			</div>
		</div>
	);
}

import React from "react";
import { TaskIcon, BugIcon } from "../../components/elements/Icons";

export default function Row(props: any) {
	const { item, editWorkItem, setSelectedItem } = props;
	return (
		<tr
			onClick={() => {
				editWorkItem();
				setSelectedItem(item);
			}}
			className="relative z-10 cursor-pointer border-b border-b-gray-200 duration-300 last:border-none even:bg-gray-50 hover:bg-gray-100 dark:border-none dark:odd:bg-gray-700  dark:even:bg-gray-800 dark:hover:bg-gray-900"
		>
			<td>{item.title}</td>
			<td>
				<div className="flex items-center gap-2">
					{item.type === "Task" ? <TaskIcon size={20} /> : <BugIcon size={20} />}
					{item.type}
				</div>
			</td>
			<td>{item.state}</td>
			<td>
				<div className="flex items-center gap-2">
					<img
						key={item.assignee.id}
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-slate-900"
						crossOrigin="anonymous"
						src={`https://mo-backend-issue-tracker.onrender.com/${item.assignee?.id}.png`}
						alt={"user"}
					/>
					<p>{item.assignee.name}</p>
				</div>
			</td>
		</tr>
	);
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";
import {
	TbArrowLeft,
	TbBug,
	TbCheckupList,
	TbDotsVertical,
	TbPlus,
	TbTemplate,
} from "react-icons/tb";

export default function Row(props: any) {
	const navigate = useNavigate();
	const { project, selectedRow, setSelectedRow } = props;
	const pbi = project.workItems.filter((i: any) => i.type === "PBI").length;
	const task = project.workItems.filter((i: any) => i.type === "Task").length;
	const bug = project.workItems.filter((i: any) => i.type === "Bug").length;
	return (
		<tr
			className="relative z-10 cursor-pointer border-b border-b-gray-200 duration-300 last:border-none hover:bg-gray-50 dark:border-none dark:odd:bg-gray-700 dark:even:bg-gray-800 dark:hover:bg-slate-900"
			onClick={() => navigate(project.id)}
		>
			<td>{project.title}</td>
			<td>
				<div className="flex w-60 items-center gap-3 text-xs">
					<div className="flex flex-1 items-center justify-center gap-1 rounded-md bg-indigo-200 py-1 px-2 text-indigo-600 dark:bg-indigo-600 dark:text-indigo-200">
						PBI
						<span>{pbi}</span>
					</div>

					<div className="flex flex-1 items-center justify-center gap-1 rounded-md bg-emerald-200 py-1 px-2 text-emerald-600 dark:bg-emerald-600 dark:text-emerald-200">
						Task
						<span>{task}</span>
					</div>

					<div className="flex flex-1 items-center justify-center gap-1 rounded-md bg-pink-200 py-1 px-2 text-pink-600 dark:bg-pink-600 dark:text-pink-200">
						Bug
						<span>{bug}</span>
					</div>
				</div>
			</td>
			<td className="flex items-center justify-center gap-2" style={{ minWidth: "200px" }}>
				{project.users.map((user: any) => (
					<Tooltip
						key={user.id}
						slideDirection="y"
						styles="-top-7 -left-5"
						text={user.name}
						active={true}
					>
						<img
							className="h-6 w-6 rounded-full bg-gray-200 object-contain dark:bg-slate-900"
							crossOrigin="anonymous"
							src={`http://localhost:3500/${user?.id}.png`}
							alt={"user"}
						/>
					</Tooltip>
				))}
			</td>
		</tr>
	);
}

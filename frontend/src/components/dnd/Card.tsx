import { PropsWithChildren } from "react";
import { TbBug, TbCheckupList, TbTemplate } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";
import { BugIcon, PbiIcon, TaskIcon } from "../elements/Icons";

type Props = PropsWithChildren<{
	item?: any;
	handleDragStart?: any;
	dragOver?: any;
	showUser?: boolean;
}>;

export default function Card({ item, handleDragStart, dragOver, showUser }: Props) {
	return (
		<div
			draggable
			onDragStart={(e: any) => handleDragStart(e, item)}
			onDragOver={e => e.preventDefault()}
			className={classNames(
				dragOver ? "opacity-50" : "opacity-100",
				"relative flex cursor-grab flex-col rounded-md border border-gray-200 bg-white p-3 dark:border-none dark:bg-slate-800"
			)}
		>
			<div className="flex">
				<div className="flex items-center gap-1 rounded-md">
					{item?.type === "Bug" && <BugIcon size={15} />}
					{item?.type === "Task" && <TaskIcon size={15} />}
					{item?.type === "PBI" && <PbiIcon size={15} />}

					<p>{item?.type}</p>
				</div>
			</div>

			<h1 className="mt-2 text-lg font-bold">{item?.title}</h1>

			{showUser && (
				<div className="mt-2 flex items-center gap-1">
					<img
						className="h-5 w-5 rounded-full object-contain"
						src={`http://localhost:3500/${item?.assignee?.id}.png`}
						crossOrigin="anonymous"
						alt="avatar"
					/>
					<p className="text-sm text-gray-600 dark:text-gray-200">
						{item?.assignee?.name}
					</p>
				</div>
			)}
			<div className="mt-2 flex justify-between text-sm">
				<p className="text-gray-600 dark:text-gray-200">State: {item?.status}</p>
			</div>
		</div>
	);
}

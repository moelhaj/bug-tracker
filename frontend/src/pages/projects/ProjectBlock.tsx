import React from "react";
import { TbTemplate } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setCurrentProject } from "../../app/slices/appSlice";
import RelativeTime from "../../utilities/RelativeTime";
import TextOverflow from "../../utilities/TextOverflow";

type Props = {
	project: {
		id: string;
		title: string;
		details: string;
		users: any[];
		endDate: string;
		_count: {
			stories: number;
		};
	};
};

export default function ProjectBlock({ project }: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				dispatch(setCurrentProject(project.id));
				navigate(project.id);
			}}
			className="flex cursor-pointer flex-col rounded-md border bg-white p-3 shadow-sm duration-300 hover:bg-gray-50 dark:border-none dark:bg-gray-800"
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
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-gray-900"
						crossOrigin="anonymous"
						src={`${process.env.REACT_APP_BACKEND_API}/${user?.id}.png`}
						alt={"user"}
					/>
				))}
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-2 text-sm">
					<div className="text-indigo-500 dark:text-indigo-300">
						<TbTemplate size={15} />
					</div>
					<p>{project?._count.stories}</p>
				</div>
				<p className="text-sm">Due {RelativeTime(project.endDate)}</p>
			</div>
		</div>
	);
}

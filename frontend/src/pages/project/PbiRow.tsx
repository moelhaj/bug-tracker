import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { BugIcon, TaskIcon } from "../../components/elements/Icons";

export default function PbiRow(props: any) {
	const { item } = props;

	return (
		<tr className="relative z-10 border-b border-b-gray-200 duration-300 last:border-none dark:border-none dark:odd:bg-gray-700 dark:even:bg-gray-800">
			<td className="w-1 text-center">
				<div
					onClick={() => {
						props.setPbiId(item.id);
						props.newWorkItem();
					}}
					className="grid cursor-pointer place-content-center rounded-md p-1 text-gray-400 duration-300 hover:text-gray-500"
				>
					<TbPlus size={20} />
				</div>
			</td>
			<td>{item.title}</td>
			<td>{item.state}</td>
			<td>{item.tag}</td>
			<td>
				<div className="flex items-center gap-2">
					<img
						key={item.assignee.id}
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-slate-900"
						crossOrigin="anonymous"
						src={`http://localhost:3500/${item.assignee?.id}.png`}
						alt={"user"}
					/>
					<p>{item.assignee.name}</p>
				</div>
			</td>
			<td>
				<div className="flex items-center gap-5">
					<div className="flex w-10 items-center gap-1">
						<TaskIcon size={20} />
						<div>
							{item.workItems.filter((item: any) => item.type === "Task").length}
						</div>
					</div>
					<div className="flex w-10 items-center gap-1">
						<BugIcon size={20} />
						<div>
							{item.workItems.filter((item: any) => item.type === "Bug").length}
						</div>
					</div>
				</div>
			</td>
		</tr>
	);
}

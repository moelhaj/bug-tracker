import { TaskIcon, BugIcon } from "../../components/elements/Icons";
import useWorkItem from "../../hooks/useWorkItem";

type Props = {
	item: {
		title: string;
		type: string;
		state: string;
		assignee: {
			id: string;
			name: string;
		};
	};
};

export default function Row({ item }: Props) {
	const { modals, setModals, setSelectedItem } = useWorkItem();
	return (
		<tr
			onClick={() => {
				setSelectedItem(item);
				setModals({ ...modals, edit: true });
			}}
			className="relative z-10 cursor-pointer border-b border-b-gray-200 duration-300 last:border-none even:bg-gray-50 hover:bg-gray-100 dark:border-none dark:odd:bg-gray-700  dark:even:bg-gray-800 dark:hover:bg-gray-900"
		>
			<td>{item.title}</td>
			<td>
				<div className="flex items-center gap-2">
					{item.type === "Task" ? <TaskIcon size={20} /> : <BugIcon size={20} />}
					<div className="hidden sm:flex">{item.type}</div>
				</div>
			</td>
			<td>{item.state}</td>
			<td>
				<div className="flex items-center gap-2">
					<img
						key={item.assignee.id}
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-gray-900"
						crossOrigin="anonymous"
						src={`https://mo-backend-issue-tracker.onrender.com/${item.assignee?.id}.png`}
						alt={"user"}
					/>
					<p className="hidden sm:flex">{item.assignee.name}</p>
				</div>
			</td>
		</tr>
	);
}

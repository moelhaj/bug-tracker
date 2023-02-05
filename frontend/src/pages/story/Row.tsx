import { TbBug, TbCheckupList } from "react-icons/tb";
import { useNavigate } from "react-router";
import { TaskIcon, BugIcon } from "../../components/elements/Icons";
import useProject from "../../hooks/useProject";

type Props = {
	item: {
		id: string;
		title: string;
		type: string;
		status: string;
		assignee: {
			id: string;
			name: string;
		};
	};
	closeMenu: () => void;
};

export default function Row({ item, closeMenu }: Props) {
	const { setCurrentWorkItem, setModals, modals } = useProject();
	return (
		<tr
			onClick={() => {
				closeMenu();
				setModals({ ...modals, editWorkItem: true });
				setCurrentWorkItem(item);
			}}
			className="relative z-10 cursor-pointer border-b border-b-gray-200 duration-300 last:border-none hover:bg-gray-100 dark:border-gray-900 dark:hover:bg-gray-700"
		>
			<td>{item?.title}</td>
			<td>
				<div className="flex items-center gap-2">
					{item.type === "Task" ? <TaskIcon size={20} /> : <BugIcon size={20} />}
					<div className="hidden sm:flex">{item?.type}</div>
				</div>
			</td>
			<td>{item?.status}</td>
			<td>
				<div className="flex items-center gap-2">
					<img
						key={item?.assignee?.id}
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-gray-900"
						crossOrigin="anonymous"
						src={`https://mo-backend-issue-tracker.onrender.com/${item?.assignee?.id}.png`}
						alt={"user"}
					/>
					<p className="hidden sm:flex">{item?.assignee?.name}</p>
				</div>
			</td>
		</tr>
	);
}

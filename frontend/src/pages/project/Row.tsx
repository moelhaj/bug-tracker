import { useNavigate } from "react-router";
import TextOverflow from "../../utilities/TextOverflow";

type Props = {
	story: {
		id: string;
		title: string;
		details: string;
		status: string;
		workItems: any;
		assignee: {
			id: string;
			name: string;
		};
		_count: {
			workItems: number;
		};
	};
};

export default function Row({ story }: Props) {
	const navigate = useNavigate();
	return (
		<tr
			onClick={() => navigate(`/stories/${story.id}`)}
			className="relative z-10 cursor-pointer border-b border-b-gray-200 duration-300 last:border-none hover:bg-gray-100 dark:border-gray-900 dark:hover:bg-gray-700"
		>
			<td>{TextOverflow(story.title, 3)}</td>
			<td>{story._count.workItems}</td>
			<td>
				<div className="flex items-center gap-2">
					<img
						key={story.assignee.id}
						className="h-7 w-7 rounded-full bg-gray-200 object-contain dark:bg-gray-900"
						crossOrigin="anonymous"
						src={`https://mo-backend-issue-tracker.onrender.com/${story.assignee?.id}.png`}
						alt={"user"}
					/>
					<p className="hidden sm:flex">{story.assignee.name}</p>
				</div>
			</td>
		</tr>
	);
}

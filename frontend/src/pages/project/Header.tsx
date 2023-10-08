import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import useWorkItem from "../../hooks/useProject";

export default function Header() {
	const { modals, setModals } = useWorkItem();
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.user);
	return (
		<div className="mt-5 flex items-center">
			<div>
				<button
					onClick={() => navigate("/projects")}
					className="btn btn-secondary px-2 py-1"
				>
					Back
				</button>
			</div>
			<div className="flex-1" />
			{user.roles.includes("admin") && (
				<button
					onClick={() => setModals({ ...modals, newStory: true })}
					className="btn btn-primary px-2 py-1"
				>
					New User Story
				</button>
			)}
		</div>
	);
}

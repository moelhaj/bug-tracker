import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";

export default function Header(props: any) {
	const { modals, setModals } = props;
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.user);
	return (
		<div className="mt-5 flex items-center">
			<div>
				<button onClick={() => navigate("/")} className="btn btn-secondary px-2 py-1">
					Back
				</button>
			</div>
			<div className="flex-1" />
			{user.roles.includes("admin") && (
				<button
					onClick={() => setModals({ ...modals, workItem: true })}
					className="btn btn-primary px-2 py-1"
				>
					New Work Item
				</button>
			)}
		</div>
	);
}

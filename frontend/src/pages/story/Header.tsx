import { useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/elements/Menu";
import useProject from "../../hooks/useProject";

export default function Header({ currentProject }: { currentProject: string }) {
	const { modals, setModals } = useProject();
	const [openMenu, setOpenMenu] = useState(false);
	const navigate = useNavigate();
	return (
		<div className="mt-5 flex items-center">
			<div>
				<button
					onClick={() => navigate(`/projects/${currentProject}`)}
					className="btn btn-secondary px-2 py-1"
				>
					Back
				</button>
			</div>
			<div className="flex-1" />
			<div className="relative">
				<Menu
					hide={() => setOpenMenu(false)}
					isOpen={openMenu}
					styles="top-10 right-0"
					button={
						<div
							onClick={() => setOpenMenu(!openMenu)}
							className="block cursor-pointer rounded-md p-1 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
						>
							<TbDotsVertical size={20} />
						</div>
					}
				>
					<div className="flex w-40 flex-col gap-1 p-1">
						<div
							onClick={() => {
								setOpenMenu(false);
								setModals({ ...modals, editStory: true });
							}}
							className="flex cursor-pointer items-center gap-3 rounded-md p-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
						>
							Edit
						</div>
						<div
							onClick={() => {
								setOpenMenu(false);
								setModals({ ...modals, newWorkItem: true });
							}}
							className="flex cursor-pointer items-center gap-3 rounded-md p-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
						>
							New Item
						</div>
					</div>
				</Menu>
			</div>
		</div>
	);
}

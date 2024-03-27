import { useLocation } from "react-router-dom";
import Link from "./Link";
import { TbLayoutBoard, TbClipboardCheck, TbListDetails } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";
import User from "./User";

export default function Sidebar() {
	const location = useLocation();
	const { pathname } = location;

	const homeRef = !pathname.includes("assigned") && !pathname.includes("projects");
	return (
		<div className="my-4 ml-4 hidden flex-col gap-10 rounded-md bg-white p-2 duration-300 dark:border-gray-900 dark:bg-gray-900 lg:flex">
			<div className="flex h-full flex-col gap-5">
				<Link
					small
					to="/"
					active={homeRef}
					icon={
						<TbLayoutBoard
							className={classNames(homeRef ? "fill-indigo-200" : "")}
							size={23}
						/>
					}
					text="Dashboard"
				/>
				<Link
					small
					to="/projects"
					active={pathname.includes("projects")}
					icon={
						<TbListDetails
							size={23}
							className={classNames(
								pathname.includes("projects") ? "fill-indigo-200" : ""
							)}
						/>
					}
					text="Projects"
				/>
				<Link
					small
					to="/assigned"
					active={pathname.includes("assigned")}
					icon={
						<TbClipboardCheck
							size={23}
							className={classNames(
								pathname.includes("assigned") ? "fill-indigo-200" : ""
							)}
						/>
					}
					text="My Tasks"
				/>
				<div className="flex-1"></div>
				<User />
			</div>
		</div>
	);
}

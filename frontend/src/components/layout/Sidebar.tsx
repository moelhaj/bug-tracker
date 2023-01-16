import { useLocation } from "react-router-dom";
import Link from "./Link";
import { TbLayoutBoard, TbCalendarMinus, TbServer2, TbListDetails } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";

export default function Sidebar() {
	const location = useLocation();
	const { pathname } = location;

	const homeRef = !pathname.includes("/projects");
	return (
		<div className="my-4 ml-4 hidden flex-col gap-10 rounded-md border bg-white p-3 duration-300 dark:border-slate-900 dark:bg-slate-900 lg:flex">
			<div className="flex flex-col gap-5">
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
					active={pathname.includes("projects") || pathname.includes("work-items")}
					icon={
						<TbServer2
							size={23}
							className={classNames(
								pathname.includes("projects") || pathname.includes("work-items")
									? "fill-indigo-200"
									: ""
							)}
						/>
					}
					text="Projects"
				/>
			</div>
		</div>
	);
}

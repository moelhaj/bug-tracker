import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Link from "./Link";
import { TbLayoutBoard, TbClipboardCheck } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";
import User from "./User";
export default function MobileMenu(props: any) {
	const location = useLocation();
	const { pathname } = location;

	const homeRef = !pathname.includes("/assigned");

	useEffect(() => {
		props.setExpand(false);
	}, [pathname]);

	return (
		<>
			{props.expand && (
				<div
					className="fixed inset-0 z-40 bg-gray-800 bg-opacity-30"
					onClick={() => props.setExpand(false)}
				></div>
			)}
			<div
				className={classNames(
					props.expand ? "w-56 translate-x-0" : "w-0 -translate-x-64",
					"fixed z-50 h-full duration-300 lg:hidden"
				)}
			>
				<div className="h-full bg-white pt-20 pr-4 pl-1.5 dark:bg-gray-900">
					<div className="flex h-full flex-col gap-5">
						<Link
							to="/"
							active={homeRef}
							icon={
								<TbLayoutBoard
									size={23}
									className={classNames(homeRef ? "fill-indigo-200" : "")}
								/>
							}
							text="Projects"
						/>
						<Link
							to="/assigned"
							active={pathname.includes("assigned")}
							icon={
								<TbClipboardCheck
									size={23}
									className={classNames(
										pathname.includes("projects") ||
											pathname.includes("work-items")
											? "fill-indigo-200"
											: ""
									)}
								/>
							}
							text="My Tasks"
						/>
						<div className="flex-1"></div>
						<div className="w-52 pb-10">
							<User mobile />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

import Menu from "../elements/Menu";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import { setDarkMode } from "../../app/slices/themeSlice";
import { removeCredentials } from "../../app/slices/userSlice";

export default function User() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.user);
	const { darkMode } = useAppSelector((state: any) => state.theme);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		darkMode
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");
	}, [darkMode]);

	const userButton = (
		<div
			onClick={() => setShowMenu(prev => !prev)}
			className="grid cursor-pointer place-content-center rounded-full duration-300 hover:bg-gray-100 dark:hover:bg-slate-700 md:p-2"
		>
			<img
				className="h-7 w-7 rounded-full object-contain"
				src={`https://mo-backend-issue-tracker.onrender.com/${user?.id}.png`}
				crossOrigin="anonymous"
				alt="avatar"
			/>
		</div>
	);

	return (
		<Menu
			hide={() => setShowMenu(false)}
			isOpen={showMenu}
			styles="bottom-0 left-12"
			button={userButton}
			placement="horizontal"
		>
			<div className="left- flex w-40 flex-col">
				<div className="px-1 py-1">
					<div className="group flex w-full cursor-default items-center justify-between rounded-md px-2 py-2">
						<span>Dark Mode</span>
						<div
							onClick={() => {
								setShowMenu(false);
								dispatch(setDarkMode(!darkMode));
							}}
							className={classNames(
								darkMode ? "bg-indigo-200 px-0.5" : "bg-slate-200 px-1",
								"relative flex h-5 w-10 cursor-pointer items-center rounded-xl duration-300"
							)}
						>
							<div
								className={classNames(
									darkMode
										? "translate-x-5 bg-indigo-600"
										: "translate-x-0 bg-slate-400",
									"h-3.5 w-3.5 rounded-full duration-300"
								)}
							></div>
						</div>
					</div>
				</div>
				<div className="px-1 py-1">
					<div
						className="cursor-pointer rounded-md px-2 py-2 duration-300 hover:bg-gray-100 dark:hover:bg-slate-900"
						onClick={() => dispatch(removeCredentials())}
					>
						Logout
					</div>
				</div>
			</div>
		</Menu>
	);
}

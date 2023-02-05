import Menu from "../elements/Menu";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import { setDarkMode } from "../../app/slices/appSlice";
import { removeCredentials } from "../../app/slices/userSlice";

export default function User(props: any) {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.user);
	const { darkMode } = useAppSelector((state: any) => state.app);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		darkMode
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");
	}, [darkMode]);

	const userButton = (
		<div
			onClick={() => setShowMenu(prev => !prev)}
			className={classNames(
				props.mobile
					? "flex items-center gap-5 rounded-md bg-gray-100 py-3 px-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
					: "grid place-content-center rounded-full p-2 hover:bg-gray-100",
				"cursor-pointer duration-300 dark:hover:bg-gray-700"
			)}
		>
			<img
				className="h-7 w-7 rounded-full object-contain"
				src={`https://mo-backend-issue-tracker.onrender.com/${user?.id}.png`}
				crossOrigin="anonymous"
				alt="avatar"
			/>
			{props.mobile && (
				<div className="flex flex-col py-2">
					<span className="text-sm leading-3 text-gray-700 dark:text-gray-100">
						{user.name}
					</span>
					<span className="text-xs leading-3 text-gray-400 dark:text-gray-200">
						{user?.title}
					</span>
				</div>
			)}
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
								props.close && props.close();
							}}
							className={classNames(
								darkMode ? "bg-indigo-200 px-0.5" : "bg-gray-200 px-1",
								"relative flex h-5 w-10 cursor-pointer items-center rounded-xl duration-300"
							)}
						>
							<div
								className={classNames(
									darkMode
										? "translate-x-5 bg-indigo-500"
										: "translate-x-0 bg-gray-400",
									"h-3.5 w-3.5 rounded-full duration-300"
								)}
							></div>
						</div>
					</div>
				</div>
				<div className="px-1 py-1">
					<div
						className="cursor-pointer rounded-md px-2 py-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
						onClick={() => dispatch(removeCredentials())}
					>
						Logout
					</div>
				</div>
			</div>
		</Menu>
	);
}

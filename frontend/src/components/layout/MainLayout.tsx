import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "../../utilities/ClassNames";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";
import useNotification from "../../hooks/useNotification";

export default function MainLayout() {
	const { snack, setSnack } = useNotification();
	const [expand, setExpand] = useState(false);

	useEffect(() => {
		if (snack)
			setTimeout(() => {
				setSnack(false);
			}, 3000);
	}, [snack]);

	return (
		<>
			<div className="mx-auto flex h-full w-full max-w-7xl text-base dark:bg-slate-800 md:h-screen">
				<Sidebar />
				<MobileMenu expand={expand} setExpand={setExpand} />
				<div className="h-full w-full flex-1 p-0 lg:p-4">
					<div className="h-full w-full rounded-md border bg-white dark:border-slate-900 dark:bg-slate-900">
						<Header expand={expand} setExpand={setExpand} />
						<Outlet />
					</div>
				</div>
			</div>
			{/* Snackbar */}
			<div
				className={classNames(
					snack ? "top-7" : "-top-14",
					"font-codex fixed left-1/2 -translate-x-1/2 rounded-md bg-indigo-600 p-2 text-base text-white duration-300"
				)}
			>
				You have a new notification
			</div>
		</>
	);
}

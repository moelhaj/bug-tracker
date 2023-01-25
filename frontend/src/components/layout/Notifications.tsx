import { TbBell, TbChecks, TbBug, TbCheckupList, TbTemplate } from "react-icons/tb";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useReadNotificationsMutation } from "../../app/features/notificationsApi";
import { useState } from "react";
import dayjs from "dayjs";
import classNames from "../../utilities/ClassNames";
import Menu from "../elements/Menu";
import useNotification from "../../hooks/useNotification";
import RelativeTime from "../../utilities/RelativeTime";
import { setNewNotification } from "../../app/slices/userSlice";

export default function Notifications() {
	const dispatch = useAppDispatch();
	const { newNotification } = useAppSelector((state: any) => state.user);
	const { notifications, isLoading, isFetching, isSuccess, refetch } = useNotification();
	const [showMenu, setShowMenu] = useState(false);

	const [readNotifications] = useReadNotificationsMutation(undefined);

	const notificationTime = (date: any) => {
		const now = dayjs(new Date());
		if (now.diff(dayjs(date)) > 3600000) {
			return dayjs(date).format("DD/MM/YYYY");
		} else {
			return RelativeTime(date);
		}
	};

	const notificationsButton = (
		<div
			onClick={() => {
				refetch();
				setShowMenu(prev => !prev);
			}}
			className="cursor-pointer rounded-full p-2 duration-300 hover:bg-gray-100 dark:hover:bg-slate-700"
		>
			{newNotification && (
				<>
					<div className="absolute top-3 right-3 h-1.5 w-1.5 animate-ping rounded-full bg-indigo-600" />
					<div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-indigo-600" />
				</>
			)}
			<TbBell size={25} />
		</div>
	);
	return (
		<Menu
			hide={() => setShowMenu(false)}
			isOpen={showMenu}
			styles="top-14 right-0"
			button={notificationsButton}
			placement="vertical"
		>
			{isLoading && isFetching && (
				<div className="py-2 px-4 ">
					<div className="whitespace-nowrap py-2 px-4">Loading Notifications...</div>
				</div>
			)}
			{isSuccess && notifications.length < 1 && (
				<div className="whitespace-nowrap py-2 px-4">No new notifications</div>
			)}
			{isSuccess && notifications.length > 0 && (
				<div className="y-scroll h-40 w-72 overflow-hidden overflow-y-scroll py-3 pl-3">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-bold">Notifications</h1>
						<div
							onClick={async () => {
								await readNotifications(undefined);
								dispatch(setNewNotification(false));
								setShowMenu(false);
							}}
							className={classNames(
								newNotification
									? "cursor-pointer text-indigo-600 hover:bg-slate-100"
									: "cursor-default text-slate-700 dark:text-gray-100",
								"rounded-md p-1 duration-300"
							)}
						>
							<TbChecks size={23} />
						</div>
					</div>
					<div className="mt-5 flex flex-col gap-2">
						{notifications.map((notification: any) => (
							<div key={notification.id} className="flex items-center gap-3 py-3">
								{notification.type === "Bug" && (
									<div className="grid place-content-center rounded-md bg-rose-200 p-2 text-rose-600">
										<TbBug size={20} />
									</div>
								)}

								{notification.type === "Task" && (
									<div className="grid place-content-center rounded-md bg-green-200 p-2 text-green-600">
										<TbCheckupList size={20} />
									</div>
								)}

								{notification.type === "PBI" && (
									<div className="grid place-content-center rounded-md bg-indigo-200 p-2 text-indigo-600">
										<TbTemplate size={20} />
									</div>
								)}

								<div className="flex flex-col gap-1">
									<p className="text-sm leading-3 text-slate-600 dark:text-gray-100">
										{notification.details}
									</p>
									<p className="text-xs leading-3 text-slate-400 dark:text-gray-200">
										{notificationTime(notification.date)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</Menu>
	);
}

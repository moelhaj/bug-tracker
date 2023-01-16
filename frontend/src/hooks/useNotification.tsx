import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "../app/store";
import { useGetNotificationsQuery } from "../app/features/notificationsApi";

export const NotificationContext = createContext<any | null>(null);

export const NotificationProvider = ({ children }: { children: any }) => {
	const socket = io("http://localhost:3500");
	const {
		data: notifications,
		isLoading,
		isFetching,
		isSuccess,
		refetch,
	} = useGetNotificationsQuery(undefined);
	const [snack, setSnack] = useState(false);
	const [isNew, setIsNew] = useState(false);
	const [check, setCheck] = useState(false);
	const { user } = useAppSelector((state: any) => state.auth);

	const init = (id: string) => socket?.emit("init", id);
	const notify = (id: string) => socket?.emit("notify", id);

	useEffect(() => {
		socket?.emit("init", user?.id);
	}, []);

	useEffect(() => {
		user ? socket?.emit("init", user.id) : socket?.emit("logout");
	}, [socket]);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		socket?.emit("init", user?.id);
	// 	}, 120000);
	// 	return () => clearTimeout(timer);
	// }, []);

	socket?.on("check", async () => {
		setIsNew(true);
		setSnack(true);
	});

	// useEffect(() => {
	// 	console.log(notifications?.length);
	// }, [isFetching]);

	// useEffect(() => {
	// if (notifications?.filter((n: any) => !n.seen).length > 0) {
	// 	setIsNew(true);
	// } else {
	// 	setIsNew(false);
	// }
	// 	console.log(notifications?.length);
	// }, [isFetching, notifications]);

	return (
		<NotificationContext.Provider
			value={{
				socket,
				snack,
				isNew,
				notifications,
				isLoading,
				isFetching,
				isSuccess,
				check,
				setCheck,
				setSnack,
				init,
				notify,
				refetch,
				setIsNew,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default function useNotification() {
	return useContext(NotificationContext);
}

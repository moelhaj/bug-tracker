import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { useGetNotificationsQuery } from "../app/features/notificationsApi";
import { setNewNotification } from "../app/slices/userSlice";

export const NotificationContext = createContext<any | null>(null);

export const NotificationProvider = ({ children }: { children: any }) => {
	const dispatch = useAppDispatch();
	const socket = io(`${process.env.REACT_APP_SOCKET_IO}`);
	const {
		data: notifications,
		isLoading,
		isFetching,
		isSuccess,
		refetch,
	} = useGetNotificationsQuery(undefined);
	const [snack, setSnack] = useState(false);
	const [check, setCheck] = useState(false);
	const { user } = useAppSelector((state: any) => state.user);

	const init = (id: string) => socket?.emit("init", id);
	const notify = (id: string) => socket?.emit("notify", id);

	useEffect(() => {
		socket?.emit("init", user?.id);
	}, []);

	useEffect(() => {
		user ? socket?.emit("init", user.id) : socket?.emit("logout");
	}, [socket]);

	socket?.on("check", async () => {
		dispatch(setNewNotification(true));
		setSnack(true);
	});

	return (
		<NotificationContext.Provider
			value={{
				socket,
				snack,
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
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default function useNotification() {
	return useContext(NotificationContext);
}

import { useEffect } from "react";
import { store } from "../store";
import { usersApi } from "./usersApi";
import { projectsApi } from "./projectsApi";
import { notificationsApi } from "./notificationsApi";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
	useEffect(() => {
		const users = store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));
		const notifications = store.dispatch(
			notificationsApi.endpoints.getNotifications.initiate(undefined)
		);

		return () => {
			users.unsubscribe();
			notifications.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;

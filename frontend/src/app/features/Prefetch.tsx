import { useEffect } from "react";
import { store } from "../store";
import { projectsApi } from "./projectsApi";
import { usersApi } from "./usersApi";
import { notificationsApi } from "./notificationsApi";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
	useEffect(() => {
		const projects = store.dispatch(
			projectsApi.endpoints.getProjects.initiate({ take: 5, skip: 0, title: "" })
		);
		const notifications = store.dispatch(
			notificationsApi.endpoints.getNotifications.initiate("")
		);
		const users = store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));

		return () => {
			projects.unsubscribe();
			notifications.unsubscribe();
			users.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;

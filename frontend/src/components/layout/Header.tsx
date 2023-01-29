import Toggler from "./Toggler";
import { useLogoutMutation } from "../../app/features/authApi";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Notifications from "./Notifications";

export default function Header(props: any) {
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.user);

	useEffect(() => {
		if (!user) navigate("/login");
	}, [user]);

	return (
		<header className="flex items-center border-b border-b-gray-100 px-1 py-2 dark:border-b-gray-900 md:px-3">
			<div className="lg:hidden">
				<Toggler toggleMenu={() => props.setExpand(!props.expand)} menu={props.expand} />
			</div>
			<div className="flex-1"></div>
			<Notifications />
		</header>
	);
}

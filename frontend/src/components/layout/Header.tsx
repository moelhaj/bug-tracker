import Toggler from "./Toggler";
import Menu from "../elements/Menu";
import { useLogoutMutation } from "../../app/features/authApi";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Notifications from "./Notifications";
import classNames from "../../utilities/ClassNames";
import User from "./User";

export default function Header(props: any) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.auth);
	const [logout] = useLogoutMutation();

	useEffect(() => {
		if (!user) navigate("/login");
	}, [user]);

	return (
		<header className="svg-pattern-gray flex items-center border-b border-b-gray-100 px-4 py-2 dark:border-b-slate-900">
			<div className="lg:hidden">
				<Toggler toggleMenu={() => props.setExpand(!props.expand)} menu={props.expand} />
			</div>
			<div className="flex-1"></div>
			<div className="flex items-center gap-5">
				{/* Notification Menu */}
				<Notifications />
				{/* User Menu */}
				<User />
			</div>
		</header>
	);
}

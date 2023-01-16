import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

export default function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
	const { user } = useAppSelector((state: any) => state.auth);
	const location = useLocation();

	const content =
		user && user.roles.some((role: string) => allowedRoles.includes(role)) ? (
			<Outlet />
		) : (
			<Navigate to="/login" state={{ from: location }} replace />
		);

	return content;
}

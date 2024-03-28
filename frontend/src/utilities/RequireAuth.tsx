import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

export default function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
	const { user } = useAppSelector((state: any) => state.user);
	const location = useLocation();

	const content = user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;

	return content;
}

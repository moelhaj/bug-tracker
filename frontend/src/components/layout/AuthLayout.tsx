import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className="grid min-h-screen w-screen place-content-center bg-gray-100">
			<Outlet />
		</div>
	);
}

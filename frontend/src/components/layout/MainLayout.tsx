import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
	return (
		<>
			<div className="relative mx-auto h-screen w-screen overflow-hidden md:max-w-[1200px]">
				<div className="w-full rounded-md">
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	);
}

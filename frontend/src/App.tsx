import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/auth/LoginPage";
import Projects from "./pages/projects";
import WorkItems from "./pages/workItems";
import Assigned from "./pages/assigned";

import RequireAuth from "./utilities/RequireAuth";
import Prefetch from "./app/features/Prefetch";

export const ROLES = {
	Employee: "user",
	Admin: "admin",
};

export default function App() {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
				<Route element={<Prefetch />}>
					<Route element={<MainLayout />}>
						<Route path="/">
							<Route index element={<Projects />} />
						</Route>
						<Route path="/project">
							<Route path=":projectId" element={<WorkItems />} />
						</Route>
						<Route path="/assigned">
							<Route index element={<Assigned />} />
						</Route>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

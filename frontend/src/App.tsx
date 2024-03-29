import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Project from "./pages/project";
import Assigned from "./pages/assigned";
import Story from "./pages/story";

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
							<Route index element={<Dashboard />} />
						</Route>
						<Route path="/projects">
							<Route index element={<Projects />} />
							<Route path=":projectId" element={<Project />} />
						</Route>
						<Route path="/stories">
							<Route path=":storyId" element={<Story />} />
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

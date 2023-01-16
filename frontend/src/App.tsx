import { Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/Main";
import "./App.css";

// import NewProject from "./pages/projects/NewProject";
// import Project from "./pages/projects/Project";
// import NewWorkItem from "./pages/workItems/NewWorkItem";
// import Meetings from "./pages/meetings";
// import { AuthGuard } from "./app/utilities";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import MainLayout from "./components/layout/MainLayout";
import Projects from "./pages/projects";
import Project from "./pages/project";
import Test from "./pages/test";

import RequireAuth from "./utilities/RequireAuth";

export const ROLES = {
	Employee: "User",
	Admin: "Admin",
};

export default function App() {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
				<Route element={<MainLayout />}>
					<Route path="/">
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="projects">
						<Route index element={<Projects />} />
						<Route path=":projectId" element={<Project />} />
					</Route>
					<Route path="test">
						<Route index element={<Test />} />
					</Route>
				</Route>
			</Route>
			{/* <Route path="login" element={<Login />} />
			<Route element={<AuthGuard allowedRoles={[...Object.values(ROLES)]} />}>
				<Route element={<Layout />}>
					<Route path="/">
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="projects">
						<Route index element={<Projects />} />
						<Route path="new" element={<NewProject />} />
						<Route path=":projectId" element={<Project />} />
					</Route>
					<Route path="work-items">
						<Route path="new/:type/:projectId" element={<NewWorkItem />} />
					</Route>
					<Route path="meetings">
						<Route index element={<Meetings />} />
					</Route>
				</Route>
			</Route> */}
		</Routes>
	);
}

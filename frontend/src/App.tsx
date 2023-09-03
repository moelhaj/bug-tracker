import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "components/layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Expenses from "./pages/expenses";
import RequireAuth from "./utils/requireAuth";

export default function App() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Route>
			<Route element={<RequireAuth />}>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Expenses />} />
				</Route>
			</Route>
		</Routes>
	);
}

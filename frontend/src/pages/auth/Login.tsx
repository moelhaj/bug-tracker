import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useLoginMutation } from "../../app/features/authApi";
import { setCredentials } from "../../app/slices/authSlice";
import TextInput from "../../components/form/TextInput";
import { TbEye, TbEyeOff } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";

export default function Login() {
	const { user } = useAppSelector((state: any) => state.auth);
	const [toggleUser, setToggleUser] = useState("right");
	const [email, setEmail] = useState("bernard.lowe@codex.io");
	const [password, setPassword] = useState("password");
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	useEffect(() => {
		setLoginError("");
	}, [email, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (email === "") return setLoginError("Email is required");
		if (password === "") return setLoginError("Password is required");

		try {
			const { user, token } = await login({ email, password }).unwrap();
			dispatch(setCredentials({ user, token }));
			navigate("/");
		} catch (error) {
			console.log(error);
			setLoginError("Wrong Credentials");
		}
	};

	return (
		<div className="font-codex flex h-screen w-screen items-center justify-center bg-gray-100 text-base dark:bg-slate-800">
			<div className="flex w-80 flex-col justify-center gap-5 rounded-xl bg-white p-5 dark:bg-slate-900">
				<div className="relative flex h-10 w-full items-center justify-between rounded-md bg-gray-100 px-0.5 dark:bg-slate-700">
					<div
						style={{ width: "138px" }}
						className={classNames(
							toggleUser === "right"
								? "translate-x-0 transform"
								: "translate-x-full transform",
							"absolute h-9 rounded-md bg-white p-2 duration-300 dark:bg-slate-900"
						)}
					></div>
					<div
						className="relative z-10 grid w-40 cursor-pointer select-none place-content-center"
						onClick={() => {
							setToggleUser("right");
							setEmail("bernard.lowe@codex.io");
							setPassword("password");
						}}
					>
						Admin
					</div>
					<div
						className="relative z-10 grid w-40 cursor-pointer select-none place-content-center"
						onClick={() => {
							setToggleUser("left");
							setEmail("clementine.pennyfeather@codex.io");
							setPassword("password");
						}}
					>
						User
					</div>
				</div>

				<form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-7">
					{loginError !== "" && (
						<div className="rounded-md bg-rose-100 p-2 text-center text-sm text-rose-600">
							{loginError}
						</div>
					)}

					{/* Email */}
					<TextInput
						type="email"
						required
						fullWidth
						id="email"
						value={email}
						handleChange={(e: any) => setEmail(e.target.value)}
						label="Email"
					/>

					{/* Password */}
					<div className="relative">
						<TextInput
							type={showPassword ? "text" : "password"}
							required
							fullWidth
							id="password"
							value={password}
							handleChange={(e: any) => setPassword(e.target.value)}
							label="Password"
						/>
						<div
							className="absolute top-3 right-3 z-50 cursor-pointer select-none text-slate-400 dark:text-slate-100"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <TbEyeOff size={16} /> : <TbEye size={16} />}
						</div>
					</div>

					{/* Login button */}
					<div>
						<button
							className="w-full select-none rounded-md border border-transparent bg-indigo-600 py-2 px-2 text-sm text-white duration-300 hover:bg-indigo-700 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-600 disabled:hover:bg-gray-200 disabled:hover:text-gray-600 dark:disabled:bg-slate-900 dark:disabled:text-slate-400"
							disabled={isLoading}
							type="submit"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

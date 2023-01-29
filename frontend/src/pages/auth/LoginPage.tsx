import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useLoginMutation } from "../../app/features/authApi";
import { setCredentials } from "../../app/slices/userSlice";
import classNames from "../../utilities/ClassNames";
import LoginForm from "./LoginForm";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const { user } = useAppSelector((state: any) => state.user);
	const [account, setAccount] = useState({
		email: "bernard.lowe@issuetracker.com",
		password: "password",
		current: "admin",
		showPassword: false,
		error: "",
	});

	useEffect(() => {
		user && navigate("/");
	}, [user]);

	useEffect(() => {
		setAccount({ ...account, error: "" });
	}, [account.email, account.password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const { user, token } = await login({
				email: account.email,
				password: account.password,
			}).unwrap();
			dispatch(setCredentials({ user, token }));
			navigate("/");
		} catch (error) {
			setAccount({ ...account, error: "Wrong Credentials" });
		}
	};

	return (
		<div className="font-codex flex h-screen w-screen items-center justify-center bg-gray-100 text-base dark:bg-gray-800">
			<div className="flex w-80 flex-col justify-center gap-5 rounded-xl bg-white p-5 dark:bg-gray-900">
				<div className="relative flex h-10 w-full items-center justify-between rounded-md bg-gray-100 px-0.5 dark:bg-gray-700">
					<div
						style={{ width: "138px" }}
						className={classNames(
							account.current === "admin"
								? "translate-x-0 transform"
								: "translate-x-full transform",
							"absolute h-9 rounded-md bg-white p-2 duration-300 dark:bg-gray-900"
						)}
					></div>
					<div
						className="relative z-10 grid h-full w-40 cursor-pointer select-none place-content-center"
						onClick={() =>
							setAccount({
								...account,
								current: "admin",
								email: "bernard.lowe@issuetracker.com",
								password: "password",
							})
						}
					>
						Admin
					</div>
					<div
						className="relative z-10 grid h-full w-40 cursor-pointer select-none place-content-center"
						onClick={() =>
							setAccount({
								...account,
								current: "user",
								email: "dolores.abernathy@issuetracker.com",
								password: "password",
							})
						}
					>
						User
					</div>
				</div>

				<LoginForm
					account={account}
					setAccount={setAccount}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

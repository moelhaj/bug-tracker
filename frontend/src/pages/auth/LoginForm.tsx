import { TbEye, TbEyeOff } from "react-icons/tb";

type Props = {
	account: {
		email: string;
		password: string;
		current: string;
		showPassword: boolean;
		error: string;
	};
	setAccount: any;
	handleSubmit: any;
	isLoading: boolean;
};
export default function LoginForm({ handleSubmit, account, setAccount, isLoading }: Props) {
	return (
		<form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-7">
			{account.error && (
				<div className="rounded-md bg-rose-100 p-2 text-center text-sm text-rose-600">
					{account.error}
				</div>
			)}

			{/* Email */}
			<input
				required
				placeholder="Email"
				type="email"
				value={account.email}
				onChange={(e: any) => setAccount({ ...account, email: e.target.value })}
				className="input"
			/>

			{/* Password */}
			<div className="relative">
				<input
					type={account.showPassword ? "text" : "password"}
					required
					value={account.password}
					onChange={(e: any) => setAccount({ ...account, password: e.target.value })}
					placeholder="Password"
					className="input w-full"
				/>
				<div
					className="absolute top-2.5 right-3 z-50 cursor-pointer select-none text-slate-400 dark:text-slate-100"
					onClick={() => setAccount({ ...account, showPassword: !account.showPassword })}
				>
					{account.showPassword ? <TbEyeOff size={16} /> : <TbEye size={16} />}
				</div>
			</div>

			<button disabled={isLoading} type="submit" className="btn btn-primary p-2">
				Login
			</button>
		</form>
	);
}

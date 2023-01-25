import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";

type Props = PropsWithChildren<{
	primary?: boolean;
	secondary?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	handleClick?: any;
	type?: "button" | "submit" | "reset" | undefined;
	large?: boolean;
}>;

export default function Button({
	primary,
	secondary,
	disabled,
	handleClick,
	fullWidth,
	type,
	children,
	large,
}: Props) {
	if (primary)
		return (
			<button
				disabled={disabled}
				onClick={handleClick}
				className={classNames(
					fullWidth ? "w-full" : "",
					large ? "p-2" : "px-2 py-1",
					"btn btn-primary"
				)}
				type={type}
			>
				{children}
			</button>
		);

	if (secondary)
		return (
			<button
				onClick={handleClick}
				className={classNames(
					fullWidth ? "w-full" : "",
					large ? "p-2" : "px-2 py-1",
					"btn btn-secondary"
				)}
			>
				{children}
			</button>
		);

	return (
		<button
			onClick={handleClick}
			className={classNames(
				fullWidth ? "w-full" : "",
				large ? "p-2" : "px-2 py-1",
				"btn btn-default"
			)}
		>
			{children}
		</button>
	);
}

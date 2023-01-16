import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";

type Props = PropsWithChildren<{
	primary?: boolean;
	secondary?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	handleClick?: any;
}>;

export default function Button(props: Props) {
	if (props.primary)
		return (
			<button
				disabled={props.disabled}
				onClick={props.handleClick}
				className={classNames(props.fullWidth ? "w-full" : "", "btn btn-primary")}
			>
				{props.children}
			</button>
		);

	if (props.secondary)
		return (
			<button
				onClick={props.handleClick}
				className={classNames(props.fullWidth ? "w-full" : "", "btn btn-secondary")}
			>
				{props.children}
			</button>
		);

	return (
		<button
			onClick={props.handleClick}
			className={classNames(props.fullWidth ? "w-full" : "", "btn btn-default")}
		>
			{props.children}
		</button>
	);
}

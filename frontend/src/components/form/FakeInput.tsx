import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";

type Props = PropsWithChildren<{
	id?: string;
	label?: string;
	value?: string;
	error?: boolean;
	errorMessage?: string;
	fullWidth?: boolean;
	readOnly?: boolean;
	handleChange?: any;
	handleFocus?: any;
	handleBlur?: any;
	handleClick?: any;
}>;

export default function FakeInput(props: Props) {
	return (
		<div className="relative py-1">
			<div className="input w-full" />
			<label
				htmlFor={props.id}
				className="label peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 peer-focus:left-2  peer-focus:-top-4 peer-focus:text-indigo-600"
			>
				{props.label}
			</label>
			{props.error && <div className="py-1 text-sm text-rose-600">{props.errorMessage}</div>}
		</div>
	);
}

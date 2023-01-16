import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";

type Props = PropsWithChildren<{
	id?: string;
	label?: string;
	value?: string;
	error?: boolean;
	type?: string;
	errorMessage?: string;
	fullWidth?: boolean;
	readOnly?: boolean;
	required?: boolean;
	handleChange?: any;
	handleFocus?: any;
	handleBlur?: any;
	handleClick?: any;
}>;

export default function TextInput(props: Props) {
	return (
		<div className="relative py-1">
			<input
				id={props.id}
				value={props.value}
				onChange={props.handleChange}
				onFocus={props.handleFocus}
				onBlur={props.handleBlur}
				onClick={props.handleClick}
				readOnly={props.readOnly}
				required={props.required}
				placeholder="hidden placeholder"
				type={props.type}
				className={classNames(
					props.error ? "border-rose-600" : "",
					props.fullWidth ? "w-full" : "",
					"input peer placeholder-transparent"
				)}
			/>
			<label
				htmlFor={props.id}
				className="label peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:-top-4  peer-focus:text-indigo-600 dark:peer-placeholder-shown:text-white dark:peer-focus:text-indigo-100"
			>
				{props.label}
			</label>
			{props.error && (
				<div className="py-1 px-2 text-sm text-rose-600">{props.errorMessage}</div>
			)}
		</div>
	);
}

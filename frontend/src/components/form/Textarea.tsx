import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";

type Props = PropsWithChildren<{
	rows?: number;
	id?: string;
	label?: string;
	value?: string;
	required?: boolean;
	handleChange?: any;
	styles?: string;
	error?: boolean;
	errorMessage?: string;
	fullWidth?: boolean;
}>;

export default function Textarea(props: Props) {
	return (
		<div className="relative py-1">
			<textarea
				rows={props.rows}
				required={props.required}
				id={props.id}
				value={props.value}
				onChange={props.handleChange}
				placeholder="hidden placeholder"
				className={classNames(
					props.error ? "border-rose-600" : "",
					props.fullWidth ? "w-full" : "",
					"input peer placeholder-transparent"
				)}
			></textarea>
			<label
				htmlFor={props.id}
				className="label peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 peer-placeholder-shown:text-gray-500 peer-focus:left-2  peer-focus:-top-4 peer-focus:text-indigo-600 dark:peer-placeholder-shown:text-white dark:peer-focus:text-indigo-100"
			>
				{props.label}
			</label>
			{props.error && (
				<div className="py-1 px-2 text-sm text-rose-600">{props.errorMessage}</div>
			)}
		</div>
	);
}

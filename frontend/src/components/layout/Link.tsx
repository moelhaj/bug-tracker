import { NavLink } from "react-router-dom";
import classNames from "../../utilities/ClassNames";
import Tooltip from "../elements/Tooltip";

export default function Link(props: any) {
	if (props.small) {
		return (
			<Tooltip styles="top-2 left-11" placement="x" text={props.text}>
				<NavLink
					to={props.to}
					className={classNames(
						props.active ? "text-indigo-600 dark:text-white" : "",
						"flex cursor-pointer items-center justify-center gap-4 rounded-md p-2 duration-300"
					)}
				>
					<div
						className={classNames(
							props.active
								? "[&>*]:fill-indigo-200 [&>*]:stroke-indigo-600 dark:[&>*]:fill-indigo-600 dark:[&>*]:stroke-indigo-200"
								: ""
						)}
					>
						{props.icon}
					</div>
				</NavLink>
			</Tooltip>
		);
	} else {
		return (
			<div className="w-full">
				<NavLink
					to={props.to}
					className={classNames(
						props.active ? "text-indigo-600 dark:text-indigo-300" : "",
						"flex w-full cursor-pointer items-center gap-3 py-2 duration-300 hover:text-indigo-600 dark:hover:text-indigo-300"
					)}
				>
					<div
						className={classNames(
							props.active ? "[&>*]:fill-indigo-200 dark:[&>*]:fill-indigo-600" : ""
						)}
					>
						{props.icon}
					</div>
					<span className="leading-3">{props.text}</span>
				</NavLink>
			</div>
		);
	}
}

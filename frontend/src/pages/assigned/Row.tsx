import { useEffect, useState } from "react";
import { BugIcon, TaskIcon } from "../../components/elements/Icons";
import Select from "../../components/form/Select";
import classNames from "../../utilities/ClassNames";

export default function Row(props: any) {
	const { item, setState } = props;
	const [showMenu, setShowMenu] = useState(false);
	const [currentState, setCurrentState] = useState(item.state);
	const states = ["New", "InProgress", "Done"];
	return (
		<tr className="even:bg-gray-50 hover:bg-gray-100 dark:border-none dark:odd:bg-gray-700  dark:even:bg-gray-800 dark:hover:bg-gray-900">
			<td>{item.title}</td>
			<td>
				<div className="flex items-center gap-2">
					{item.type === "Task" ? <TaskIcon size={20} /> : <BugIcon size={20} />}
					<div className="hidden sm:flex">{item.type}</div>
				</div>
			</td>
			<td>
				<div className="relative">
					<div
						className="cursor-pointer rounded-md border border-gray-300 p-1 dark:border-none"
						onClick={() => setShowMenu(!showMenu)}
					>
						{currentState === "InProgress" ? "In Progress" : currentState}
					</div>
					{showMenu && (
						<div onClick={() => setShowMenu(false)} className="fixed inset-0 z-10" />
					)}
					{showMenu && (
						<div className="fixed z-20 flex flex-col rounded-md border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
							{states.map((state: string) => (
								<div
									key={state}
									onClick={() => {
										setState(state, item);
										setCurrentState(state);
										setShowMenu(false);
									}}
									className={classNames(
										item.state === state ? "text-indigo-600" : "",
										"cursor-pointer rounded-md p-1 duration-300 hover:bg-gray-50 dark:hover:bg-gray-900"
									)}
								>
									{state}
								</div>
							))}
						</div>
					)}
				</div>
				{/* <Select
					items={states}
					label="State"
					selected={
						currentState === "InProgress"
							? "In Progress"
							: currentState !== ""
							? currentState
							: item.state === "InProgress"
							? "In Progress"
							: item.state
					}
					setSelected={(state: string) => {
						setState(state, item);
						setCurrentState(state);
					}}
				/> */}
			</td>
		</tr>
	);
}
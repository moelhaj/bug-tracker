import { PropsWithChildren } from "react";
import classNames from "../../utilities/ClassNames";
import Card from "./Card";

type Props = PropsWithChildren<{
	rows?: any;
	handleDragStart?: any;
	dragOver?: any;
	dragName?: any;
	setDragOver?: any;
	handleDragEnter?: any;
	title: string;
	showUser: boolean;
}>;

export default function Column({
	title,
	rows,
	dragOver,
	dragName,
	setDragOver,
	handleDragEnter,
	handleDragStart,
	showUser,
}: Props) {
	return (
		<div className="flex flex-col gap-3 p-1">
			<h1 className="text-lg font-bold duration-300">{title}</h1>
			<div
				onDragOver={e => {
					e.preventDefault();
					setDragOver(dragName);
				}}
				onDrop={() => handleDragEnter(dragName)}
				className={classNames(
					dragOver === dragName
						? "border border-indigo-600 ring-2 ring-indigo-600"
						: "border-none ring-0",
					"column-height y-scroll relative flex h-full flex-col gap-5 overflow-hidden overflow-y-scroll rounded-md bg-gray-100 pl-3 pt-3 pb-3 pr-3 duration-300 dark:bg-gray-800 lg:pr-0"
				)}
			>
				<div className="flex flex-col gap-3">
					{rows.map((item: any) => (
						<Card
							showUser={showUser}
							handleDragStart={handleDragStart}
							key={item.id}
							item={item}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

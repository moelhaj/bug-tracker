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
		<div
			onDragOver={e => {
				e.preventDefault();
				setDragOver(dragName);
			}}
			onDrop={() => handleDragEnter(dragName)}
			className="y-scroll relative flex h-full flex-col gap-5 overflow-hidden overflow-y-scroll rounded-md pl-3 pt-3 pb-3 duration-300"
		>
			<h1
				className={classNames(
					dragOver === dragName ? "text-indigo-600" : "",
					"font-bold duration-300"
				)}
			>
				{title}
			</h1>
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
	);
}

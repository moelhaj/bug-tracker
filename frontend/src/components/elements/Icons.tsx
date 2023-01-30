import { TbBug, TbCheckupList, TbTemplate } from "react-icons/tb";

export const BugIcon = ({ size }: { size: number }) => (
	<TbBug
		className="fill-pink-200 stroke-pink-600 dark:fill-transparent dark:stroke-pink-400"
		size={size}
	/>
);
export const TaskIcon = ({ size }: { size: number }) => (
	<TbCheckupList
		className="fill-indigo-200 stroke-indigo-600 dark:fill-transparent dark:stroke-indigo-400"
		size={size}
	/>
);
export const PbiIcon = ({ size }: { size: number }) => (
	<TbTemplate
		className="fill-indigo-200 stroke-indigo-600 dark:fill-indigo-600 dark:stroke-indigo-200"
		size={size}
	/>
);

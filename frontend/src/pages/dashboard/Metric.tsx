type Props = {
	icon: any;
	name: string;
	amount: number;
};

export default function Metric({ icon, name, amount }: Props) {
	return (
		<div className="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white p-3 dark:border-none dark:bg-gray-800 md:text-lg">
			<div className="grid place-content-center rounded-md bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-600 dark:text-indigo-100">
				{icon}
			</div>
			<div className="flex flex-1 flex-col leading-5">
				<div className="text-sm text-gray-500 dark:text-gray-300">{name}</div>
				<div className="font-bold">{amount}</div>
			</div>
		</div>
	);
}

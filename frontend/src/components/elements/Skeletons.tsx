import { motion } from "framer-motion";
import { TbFaceIdError, TbFaceId } from "react-icons/tb";

const Box = () => (
	<motion.div className="my-1 w-32 rounded-md bg-gray-100 p-2 dark:bg-gray-800">
		<div className="flex animate-pulse items-center space-x-2">
			<div className="h-7 w-7 rounded-md bg-gray-300 dark:bg-gray-700"></div>
			<div className="flex-1 space-y-1 py-1">
				<div className="h-1.5 rounded bg-gray-300 dark:bg-gray-700"></div>
				<div className="space-y-1">
					<div className="grid grid-cols-3 gap-1">
						<div className="col-span-2 h-1.5 rounded bg-gray-300 dark:bg-gray-700"></div>
						<div className="col-span-1 h-1.5 rounded bg-gray-300 dark:bg-gray-700"></div>
					</div>
					<div className="h-1.5 rounded bg-gray-300 dark:bg-gray-700"></div>
				</div>
			</div>
		</div>
	</motion.div>
);

export const LoadingSkeleton = () => {
	return (
		<div className="flex h-44 flex-col justify-center overflow-hidden p-1">
			<div className="animate-loading opacity-0">
				<Box />
			</div>
			<div className="animate-loading opacity-0" style={{ animationDelay: "100ms" }}>
				<Box />
			</div>
			<div className="animate-loading opacity-0" style={{ animationDelay: "130ms" }}>
				<Box />
			</div>
		</div>
	);
};

export const ErrorSkeleton = ({ message }: { message: string }) => {
	return (
		<div className="flex w-36 flex-col gap-3">
			<div className="my-1 w-full rounded-md bg-rose-100 p-2 text-rose-600">
				<div className="flex animate-pulse items-center space-x-2">
					<div className="grid h-7 w-7 place-content-center rounded-md bg-white dark:bg-rose-100">
						<TbFaceIdError size={30} />
					</div>
					<div className="flex-1 space-y-1 py-1">
						<div className="h-1.5 rounded bg-rose-400 dark:bg-rose-600"></div>
						<div className="space-y-1">
							<div className="grid grid-cols-3 gap-1">
								<div className="col-span-2 h-1.5 rounded bg-rose-400 dark:bg-rose-600"></div>
								<div className="col-span-1 h-1.5 rounded bg-rose-400 dark:bg-rose-600"></div>
							</div>
							<div className="h-1.5 rounded bg-rose-400 dark:bg-rose-600"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center text-sm text-rose-600 dark:text-rose-300">{message}</div>
		</div>
	);
};

export const NoContentSkeleton = ({ message }: { message: string }) => {
	return (
		<div className="flex w-36 flex-col items-center gap-3">
			<div className="my-1 w-full rounded-md bg-gray-100 p-2 dark:bg-gray-900">
				<div className="flex items-center space-x-2">
					<div className="grid h-7 w-7 place-content-center rounded-md bg-white dark:bg-gray-800 dark:text-gray-500">
						<TbFaceId size={30} />
					</div>
					<div className="flex-1 space-y-1 py-1">
						<div className="h-1.5 rounded bg-gray-200 dark:bg-gray-700"></div>
						<div className="space-y-1">
							<div className="grid grid-cols-3 gap-1">
								<div className="col-span-2 h-1.5 rounded bg-gray-200 dark:bg-gray-700"></div>
								<div className="col-span-1 h-1.5 rounded bg-gray-200 dark:bg-gray-700"></div>
							</div>
							<div className="h-1.5 rounded bg-gray-200 dark:bg-gray-700"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center text-sm">{message}</div>
		</div>
	);
};

export const TableSkeleton = (props: any) => {
	const rows = [...Array(props.rows).keys()];
	const columns = [...Array(props.columns).keys()];
	return (
		<tbody>
			{rows.map((row: any) => (
				<tr key={`skeleton-row-${row * Date.now()}`} className="dark:border-b-gray-800">
					{columns.map((column: any) => (
						<td
							key={`skeleton-column-${column * Date.now()}`}
							className="cursor-default p-3"
						>
							<div
								style={{ height: "28px" }}
								className="w-full animate-pulse rounded bg-gray-200 dark:bg-gray-900"
							></div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

import { useEffect, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";

type Props = {
	page: number;
	count: number;
	rowsPerPage: number;
	setPage: (args: number) => number;
};

const Pagination = ({ count, page, setPage, rowsPerPage }: Props) => {
	// const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	const [one, setOne] = useState(1);
	const [of, setOf] = useState(rowsPerPage);
	const pages = [...Array(Math.ceil(count / rowsPerPage)).keys()];
	// const one = props.page === 0 ? 1 : props.page * props.rowsPerPage;
	// const of = props.count <= props.rowsPerPage ? props.count :  props.rowsPerPage;

	useEffect(() => {
		if (rowsPerPage * (page + 1) > count) {
			setOf(count);
		} else {
			setOf(rowsPerPage * (page + 1));
		}
		if (page === 0) {
			setOne(1);
		} else {
			setOne(page * rowsPerPage);
		}
	}, [page]);

	const handlePrev = () => (page > 0 ? setPage(page - 1) : null);
	const handleNext = () => (page < pages.length - 1 ? setPage(page + 1) : null);

	return (
		<div className="flex items-center justify-center md:justify-end">
			<div className="flex items-center gap-1">
				<div>{one}</div>
				<div>-</div>
				<div>{of}</div>
			</div>
			<div className="mx-2">of</div>
			<div>{count}</div>
			<div className="ml-4 flex gap-2">
				<div
					onClick={handlePrev}
					className="grid h-7 w-7 cursor-pointer place-content-center rounded-full duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<TbChevronLeft size={20} />
				</div>
				<div
					onClick={handleNext}
					className="grid h-7 w-7 cursor-pointer place-content-center rounded-full duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<TbChevronRight size={20} />
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className="flex items-center justify-between bg-white py-3 dark:bg-slate-900">
	// 		{/* small screen */}
	// 		<div className="flex flex-1 justify-between sm:hidden">
	// 			{page > 0 && (
	// 				<span
	// 					onClick={handlePrev}
	// 					className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
	// 				>
	// 					Previous
	// 				</span>
	// 			)}
	// 			<div className="flex-1" />
	// 			{page < pages.length - 1 && (
	// 				<span
	// 					onClick={handleNext}
	// 					className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-800  dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
	// 				>
	// 					Next
	// 				</span>
	// 			)}
	// 		</div>

	// 		<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
	// 			{/* Info */}
	// 			<div>
	// 				{/* <p className="text-sm text-gray-700">
	// 					Showing <span className="font-medium">{one}</span> to{" "}
	// 					<span className="font-medium">{of}</span> of{" "}
	// 					<span className="font-medium">{count}</span> results
	// 				</p> */}
	// 			</div>
	// 			<div className="flex-1"></div>
	// 			<div>
	// 				<nav
	// 					className="isolate inline-flex -space-x-px rounded-md shadow-sm"
	// 					aria-label="Pagination"
	// 				>
	// 					<span
	// 						onClick={handlePrev}
	// 						className="relative inline-flex cursor-pointer items-center rounded-l-md border border-gray-300 bg-white p-2 font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
	// 					>
	// 						<span className="sr-only">Previous</span>
	// 						<TbChevronLeft className="h-4 w-4" aria-hidden="true" />
	// 					</span>

	// 					{pages.length > 7 &&
	// 						pages
	// 							.slice(0, 3)
	// 							.map((index: number) => (
	// 								<PageSpan
	// 									key={`pagination-${index}`}
	// 									handleClick={() => setPage(index)}
	// 									page={page}
	// 									index={index}
	// 								/>
	// 							))}

	// 					{pages.length > 7 && (
	// 						<span className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-500 focus:z-20 dark:border-slate-800 dark:bg-slate-800 dark:text-white">
	// 							...
	// 						</span>
	// 					)}

	// 					{pages.length > 7 &&
	// 						pages
	// 							.slice(-3)
	// 							.map((index: number) => (
	// 								<PageSpan
	// 									key={`pagination-${index}`}
	// 									handleClick={() => setPage(index)}
	// 									page={page}
	// 									index={index}
	// 								/>
	// 							))}

	// 					{pages.length < 7 &&
	// 						pages.map((index: number) => (
	// 							<PageSpan
	// 								key={`pagination-${index}`}
	// 								handleClick={() => setPage(index)}
	// 								page={page}
	// 								index={index}
	// 							/>
	// 						))}

	// 					<span
	// 						onClick={handleNext}
	// 						className="relative inline-flex cursor-pointer items-center rounded-r-md border border-gray-300 bg-white p-2 font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
	// 					>
	// 						<span className="sr-only">Next</span>
	// 						<TbChevronRight className="h-4 w-4" aria-hidden="true" />
	// 					</span>
	// 				</nav>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default Pagination;

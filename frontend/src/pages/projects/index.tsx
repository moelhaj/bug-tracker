import { useEffect, useRef } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import TextInput from "../../components/form/TextInput";
import {
	NoContentSkeleton,
	TableSkeleton,
	ErrorSkeleton,
} from "../../components/elements/Skeletons";
import Row from "./Row";
import Pagination from "../../components/elements/Pagination";
import Modal from "../../components/elements/Modal";
import New from "./New";
import { useAppSelector } from "../../app/store";
import Button from "../../components/elements/Button";
import useProject from "../../hooks/useProject";
import Header from "./Header";

export default function Projects() {
	const modalRef = useRef<any>();
	const {
		isFetching,
		isError,
		isSuccess,
		isLoading,
		projects,
		count,
		keyword,
		setKeyword,
		page,
		setPage,
		rowsPerPage,
	} = useProject();

	useEffect(() => {
		modalRef?.current?.closeModal();
	}, [isFetching]);

	if (isError)
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);

	return (
		<>
			{!isError && (
				<>
					<div className="content-height p-3">
						<Header
							keyword={keyword}
							setKeyword={setKeyword}
							isFetching={isFetching}
							openModal={() => modalRef.current.openModal()}
						/>
						{/* Table */}
						<div className="x-scroll mt-7 overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
							<table className="w-full border-collapse">
								<thead className="text-sm">
									<tr className="border-b border-b-gray-200 text-left text-base font-bold dark:border-none">
										<td>Title</td>
										<td>Work Items</td>
										<td className="text-center">Team</td>
									</tr>
								</thead>
								{(isLoading || isFetching) && (
									<TableSkeleton rows={5} columns={3} />
								)}
								{isSuccess && !isLoading && !isFetching && (
									<tbody>
										{projects.length < 1 && (
											<tr className="w-full">
												<td className="w-full" colSpan={6}>
													<div className="flex w-full items-center justify-center py-20">
														<NoContentSkeleton message="No items found" />
													</div>
												</td>
											</tr>
										)}
										{projects.length > 0 &&
											projects.map((project: any) => {
												return (
													<Row
														key={project.id}
														project={project}
														isFetching={isFetching}
														isLoading={isLoading}
													/>
												);
											})}
									</tbody>
								)}
							</table>
						</div>
						<div className="mt-5">
							{isSuccess && !isLoading && projects.length > 0 && (
								<Pagination
									page={page}
									setPage={setPage}
									count={count}
									rowsPerPage={rowsPerPage}
								/>
							)}
						</div>
					</div>
					<Modal ref={modalRef}>
						<div className="svg-pattern flex items-center justify-between rounded-t-md py-6 px-3 text-white">
							<h1 className="text-lg font-bold">New Project</h1>
							<button onClick={() => modalRef.current.closeModal()}>
								<TbX size={20} />
							</button>
						</div>

						<New closeModal={() => modalRef.current.closeModal()} />
					</Modal>
				</>
			)}
		</>
	);
}

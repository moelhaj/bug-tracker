import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductBacklogItemsQuery } from "../../app/features/productBacklogItemApi";
import { useAppSelector } from "../../app/store";
import Pagination from "../../components/elements/Pagination";
import {
	ErrorSkeleton,
	NoContentSkeleton,
	TableSkeleton,
} from "../../components/elements/Skeletons";
import Debounce from "../../utilities/Debounce";
import NewPbi from "./NewPbi";
import NewWorkItem from "./NewWorkItem";
import PbiRow from "./PbiRow";

export default function Project() {
	const { user } = useAppSelector((state: any) => state.user);
	const { projectId } = useParams();
	const [pbiId, setPbiId] = useState("");
	const navigate = useNavigate();
	const [newPbi, setNewPbi] = useState(false);
	const [newWorkItem, setNewWorkItem] = useState(false);
	const [page, setPage] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [rowsPerPage] = useState(5);
	const [debouncedKeyword, setDebouncedKeyword] = useState("");
	const [filters, setFilters] = useState({
		skip: Math.abs(page * rowsPerPage),
		take: rowsPerPage,
		title: keyword,
		projectId,
	});
	const { data, isLoading, isFetching, isError, isSuccess } = useGetProductBacklogItemsQuery(
		filters,
		{
			refetchOnFocus: true,
		}
	);

	useEffect(() => {
		setNewPbi(false);
		setNewWorkItem(false);
	}, [isFetching]);

	Debounce(() => setDebouncedKeyword(keyword), [keyword], 1000);

	useEffect(() => {
		setFilters({ ...filters, skip: Math.abs(page * rowsPerPage), take: rowsPerPage });
	}, [page]);

	useEffect(() => {
		setFilters({ ...filters, title: debouncedKeyword });
	}, [debouncedKeyword]);

	if (isError) {
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);
	}

	return (
		<>
			<div className="p-3">
				{/* Header */}
				<div className="mt-5 flex items-center">
					<div>
						<button
							onClick={() => navigate("/")}
							className="btn btn-secondary px-2 py-1"
						>
							Back
						</button>
					</div>
					<div className="flex-1" />
					{user.roles.includes("admin") && (
						<button
							onClick={() => setNewPbi(true)}
							className="btn btn-primary px-2 py-1"
						>
							New PBI
						</button>
					)}
				</div>
				{/* Table */}
				<div className="x-scroll mt-7 overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
					{/* Header */}
					<div className="flex items-center justify-between bg-gray-100 p-2 dark:bg-slate-700">
						<input
							onChange={(e: any) => setKeyword(e.target.value)}
							className="input"
							type="text"
							placeholder="Search"
						/>
					</div>
					<table className="w-full border-collapse">
						<thead className="text-sm">
							<tr className="border-b border-b-gray-200 text-left text-base  font-bold dark:border-none">
								<td></td>
								<td>Title</td>
								<td>State</td>
								<td>Tag</td>
								<td>Assigned To</td>
								<td>Work Items</td>
							</tr>
						</thead>
						{(isLoading || isFetching) && <TableSkeleton rows={5} columns={6} />}
						{isSuccess && !isLoading && !isFetching && (
							<tbody>
								{data?.items && data?.items.length < 1 && (
									<tr className="w-full">
										<td className="w-full" colSpan={6}>
											<div className="flex w-full items-center justify-center py-20">
												<NoContentSkeleton message="No items found" />
											</div>
										</td>
									</tr>
								)}
								{data?.items &&
									data?.items.length > 0 &&
									data?.items.map((item: any) => {
										return (
											<PbiRow
												key={item.id}
												item={item}
												isFetching={isFetching}
												isLoading={isLoading}
												newWorkItem={() => setNewWorkItem(true)}
												setPbiId={setPbiId}
											/>
										);
									})}
							</tbody>
						)}
					</table>
				</div>
				<div className="mt-5">
					{!isFetching && !isLoading && data?.items && data?.items.length > 0 && (
						<Pagination
							page={page}
							setPage={setPage}
							count={data.count}
							rowsPerPage={rowsPerPage}
						/>
					)}
				</div>
			</div>
			{newPbi && (
				<NewPbi projectId={projectId} open={newPbi} close={() => setNewPbi(false)} />
			)}
			{newWorkItem && (
				<NewWorkItem pbiId={pbiId} open={newWorkItem} close={() => setNewWorkItem(false)} />
			)}
		</>
	);
}

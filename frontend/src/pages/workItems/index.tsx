import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetWorkItemsQuery } from "../../app/features/workItemsApi";
import Pagination from "../../components/elements/Pagination";
import { ErrorSkeleton } from "../../components/elements/Skeletons";
import Header from "./Header";
import Table from "./Table";
import New from "./New";
import Edit from "./Edit";

export default function WorkItems() {
	const { projectId } = useParams();
	const [selectedItem, setSelectedItem] = useState();
	const [modals, setModals] = useState({
		new: false,
		edit: false,
	});
	const [params, setParams] = useState<any>({
		page: 0,
		rowsPerPage: 5,
		keyword: "",
	});
	const [filters, setFilters] = useState({
		skip: Math.abs(params.page * params.rowsPerPage),
		take: params.rowsPerPage,
		title: params.keyword,
		projectId,
	});

	const { data, isLoading, isFetching, isError } = useGetWorkItemsQuery(filters, {
		refetchOnFocus: true,
	});

	useEffect(() => {
		setFilters({
			...filters,
			skip: Math.abs(params.page * params.rowsPerPage),
			take: params.rowsPerPage,
		});
	}, [params.page]);

	useEffect(() => {
		setModals({ ...modals, new: false, edit: false });
	}, [isFetching]);

	if (isError) {
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);
	}

	return (
		<>
			<div className="p-2 md:p-3">
				<Header modals={modals} setModals={setModals} />
				<Table
					workItems={data?.workItems}
					success={!isLoading && !isFetching}
					loading={isLoading || isFetching}
					filters={filters}
					setFilters={setFilters}
					editWorkItem={() => setModals({ ...modals, edit: true })}
					setSelectedItem={setSelectedItem}
				/>
				<div className="mt-5">
					{data?.workItems && data?.workItems.length > 0 && (
						<Pagination
							page={params.page}
							setPage={(page: number) => setParams({ ...params, page })}
							count={data.count}
							rowsPerPage={params.rowsPerPage}
							disabled={!isFetching && !isLoading}
						/>
					)}
				</div>
			</div>
			{modals.new && (
				<New
					projectId={projectId}
					open={modals.new}
					close={() => setModals({ ...modals, new: false })}
				/>
			)}
			{modals.edit && (
				<Edit
					item={selectedItem}
					projectId={projectId}
					open={modals.edit}
					close={() => setModals({ ...modals, edit: false })}
				/>
			)}
		</>
	);
}

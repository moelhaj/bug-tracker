import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStoriesQuery } from "../../app/features/storiesApi";
import Pagination from "../../components/elements/Pagination";
import { ErrorSkeleton } from "../../components/elements/Skeletons";
import useProject from "../../hooks/useProject";
import Header from "./Header";
import Table from "./Table";
import New from "../story/New";

export default function Stories() {
	const { projectId } = useParams();
	const { filters, modals, setModals, params, setParams } = useProject();

	const { data, isLoading, isFetching, isError } = useGetStoriesQuery(
		{ ...filters, projectId },
		{
			refetchOnFocus: true,
		}
	);

	useEffect(() => {
		setModals({
			...modals,
			newStory: false,
		});
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
				<Header />
				<Table
					stories={data?.stories}
					success={!isLoading && !isFetching}
					loading={isLoading || isFetching}
				/>
				<div className="mt-5">
					{data?.stories && data?.stories.length > 0 && (
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
			{modals.newStory && <New projectId={projectId} />}
		</>
	);
}

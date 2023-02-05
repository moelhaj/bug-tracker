import useProject from "../../hooks/useProject";
import Header from "./Header";
import { useGetStoryQuery } from "../../app/features/storiesApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorSkeleton, LoadingSkeleton } from "../../components/elements/Skeletons";
import Table from "./Table";
import Details from "./Details";
import classNames from "../../utilities/ClassNames";
import { useAppSelector } from "../../app/store";
import Edit from "./Edit";
import NewWorkItem from "../workItem/NewWorkItem";
import EditWorkItem from "../workItem/EditWorkItem";

export default function Story() {
	const { storyId } = useParams();
	const { modals, setModals } = useProject();
	const [showTab, setShowTab] = useState("workItems");
	const { currentProject } = useAppSelector((state: any) => state.app);
	const {
		data: story,
		isLoading,
		isFetching,
		isError,
	} = useGetStoryQuery(storyId, {
		refetchOnFocus: true,
	});

	useEffect(() => {
		setModals({
			...modals,
			editStory: false,
			newWorkItem: false,
			editWorkItem: false,
		});
	}, [isFetching]);

	if (isError) {
		return (
			<div className="grid place-content-center py-20">
				<ErrorSkeleton message="Error, try refresh the page" />
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="grid place-content-center py-40">
				<LoadingSkeleton />
			</div>
		);
	}

	return (
		<>
			<div className="p-2 md:p-3">
				<Header currentProject={currentProject} />
				<div className="mt-5 flex flex-col">
					{/* Tabs */}
					<div className="flex items-center gap-5 border-b border-b-gray-200 text-sm dark:border-b-gray-800">
						<div
							onClick={() => setShowTab("workItems")}
							className={classNames(
								showTab === "workItems"
									? "border-b-2 border-b-indigo-500 text-indigo-500"
									: "",
								"-mb-0.5 cursor-pointer py-1"
							)}
						>
							Related Work Items
						</div>
						<div
							onClick={() => setShowTab("details")}
							className={classNames(
								showTab === "details"
									? "border-b-2 border-b-indigo-500 text-indigo-500"
									: "",
								"-mb-0.5 cursor-pointer py-1"
							)}
						>
							Details
						</div>
					</div>
					<div className="mt-5">
						{showTab === "workItems" && (
							<Table
								workItems={story?.workItems}
								success={!isLoading && !isFetching}
								loading={isLoading || isFetching}
							/>
						)}
						{showTab === "details" && <Details story={story} />}
					</div>
				</div>
			</div>
			{modals.editStory && <Edit selectedStory={story} currentProject={currentProject} />}
			{modals.newWorkItem && <NewWorkItem storyId={storyId} />}
			{modals.editWorkItem && <EditWorkItem storyId={storyId} />}
		</>
	);
}

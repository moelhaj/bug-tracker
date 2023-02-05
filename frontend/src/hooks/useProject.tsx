import { createContext, useContext, useEffect, useState } from "react";

export const ProjectContext = createContext<any | null>(null);

export const ProjectProvider = ({ children }: { children: any }) => {
	const [currentWorkItem, setCurrentWorkItem] = useState<any>(null);
	const [modals, setModals] = useState({
		newStory: false,
		editStory: false,
		newWorkItem: false,
		editWorkItem: false,
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
	});

	useEffect(() => {
		setFilters({
			...filters,
			skip: Math.abs(params.page * params.rowsPerPage),
			take: params.rowsPerPage,
		});
	}, [params.page]);

	return (
		<ProjectContext.Provider
			value={{
				params,
				filters,
				modals,
				currentWorkItem,
				setCurrentWorkItem,
				setParams,
				setFilters,
				setModals,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default function useProject() {
	return useContext(ProjectContext);
}

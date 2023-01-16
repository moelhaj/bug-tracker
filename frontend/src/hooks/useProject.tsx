import { createContext, useContext, useEffect, useState } from "react";
import { useGetProjectsQuery } from "../app/features/projectsApi";
import Debounce from "../utilities/Debounce";

export const ProjectContext = createContext<any | null>(null);

export const ProjectProvider = ({ children }: { children: any }) => {
	const [page, setPage] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [rowsPerPage] = useState(5);
	const [debouncedKeyword, setDebouncedKeyword] = useState("");

	const [filters, setFilters] = useState({
		skip: Math.abs(page * rowsPerPage),
		take: rowsPerPage,
		title: keyword,
	});
	const { data, isLoading, isSuccess, isFetching, isError } = useGetProjectsQuery(filters);

	useEffect(() => {
		setFilters({ ...filters, skip: Math.abs(page * rowsPerPage), take: rowsPerPage });
	}, [page]);

	Debounce(() => setDebouncedKeyword(keyword), [keyword], 1000);

	useEffect(() => {
		setFilters({ ...filters, title: debouncedKeyword });
	}, [debouncedKeyword]);
	return (
		<ProjectContext.Provider
			value={{
				projects: data?.projects,
				count: data?.count,
				isLoading,
				isSuccess,
				isFetching,
				isError,
				page,
				keyword,
				rowsPerPage,
				setKeyword,
				setPage,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default function useProject() {
	return useContext(ProjectContext);
}

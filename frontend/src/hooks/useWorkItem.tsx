import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetAssignedQuery } from "../app/features/assignedApi";
import { useUpdateWorkItemMutation } from "../app/features/workItemsApi";

export const WorkItemContext = createContext<any | null>(null);

export const WorkItemProvider = ({ children }: { children: any }) => {
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
	});
	useEffect(() => {
		setFilters({
			...filters,
			skip: Math.abs(params.page * params.rowsPerPage),
			take: params.rowsPerPage,
		});
	}, [params.page]);

	return (
		<WorkItemContext.Provider
			value={{
				params,
				filters,
				modals,
				selectedItem,
				setParams,
				setFilters,
				setModals,
				setSelectedItem,
			}}
		>
			{children}
		</WorkItemContext.Provider>
	);
};

export default function useWorkItem() {
	return useContext(WorkItemContext);
}

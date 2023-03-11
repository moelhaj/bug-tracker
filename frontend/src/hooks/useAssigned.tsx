import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetAssignedQuery } from "../app/features/assignedApi";
import { useUpdateWorkItemMutation } from "../app/features/workItemsApi";

export const AssignedContext = createContext<any | null>(null);

export const AssignedProvider = ({ children }: { children: any }) => {
	const { data, isFetching, isLoading, isError } = useGetAssignedQuery(undefined, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const [updateWorkItem] = useUpdateWorkItemMutation();
	const [list, setList] = useState(data);
	const filterTypes = ["All", "Task", "Bug"];
	const [keyword, setKeyword] = useState("");
	const [filter, setFilter] = useState("");
	const [filterMenu, setFilterMenu] = useState(false);

	useEffect(() => {
		if (!isFetching) {
			setList(data);
		}
	}, [isFetching]);

	useEffect(() => {
		setFilterMenu(false);
	}, [filter]);

	const rows = useMemo(() => {
		let items = list;
		if (filter || keyword) {
			items = list?.filter(
				(item: any) =>
					(item.title.toLowerCase().includes(keyword.toLowerCase()) ||
						item.status.toLowerCase().includes(keyword.toLowerCase())) &&
					item.type.includes(filter)
			);
		}
		return items;
	}, [list, keyword, filter]);

	const updateList = async (group: string, dragItem: any) => {
		setList([
			...list?.filter((el: any) => el.id !== dragItem.current.id),
			{ ...dragItem.current, status: group },
		]);
		await updateWorkItem({ ...dragItem.current, status: group });
	};

	const updateItem = async (status: string, item: any) =>
		await updateWorkItem({ ...item, status });

	return (
		<AssignedContext.Provider
			value={{
				isError,
				isLoading,
				rows,
				list,
				keyword,
				filterTypes,
				filter,
				filterMenu,
				setFilter,
				setKeyword,
				setFilterMenu,
				updateList,
				updateItem,
			}}
		>
			{children}
		</AssignedContext.Provider>
	);
};

export default function useAssigned() {
	return useContext(AssignedContext);
}

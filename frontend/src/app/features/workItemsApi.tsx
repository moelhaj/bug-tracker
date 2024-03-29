import { api } from "../api";

type Filters = {
	take: number;
	skip: number;
	title: string;
	projectId: string | undefined;
};

type WorkItem = {
	id: number;
	title: string;
	details: string;
	status: string;
	assignee: any;
	createdAt: Date;
};

type WorkItemsResponse = {
	count: number;
	workItems: WorkItem[];
};

export const workItemsApi = api.injectEndpoints({
	endpoints: builder => ({
		getWorkItems: builder.query<WorkItemsResponse, Filters>({
			query: (filters: any) => `/items?filters=${JSON.stringify(filters)}`,
			providesTags: result =>
				result
					? [
							...result.workItems.map(({ id }) => ({
								type: "WorkItems" as const,
								id,
							})),
							{ type: "WorkItems", id: "LIST" },
					  ]
					: [{ type: "WorkItems", id: "LIST" }],
		}),
		getWorkItem: builder.query<WorkItem, string | undefined>({
			query: id => `/items/${id}`,
			providesTags: ["WorkItems"],
		}),
		addWorkItem: builder.mutation({
			query: item => ({
				url: "/items",
				method: "POST",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["WorkItems", "Stories", "Assigned"],
		}),
		updateWorkItem: builder.mutation({
			query: item => ({
				url: `/items/${item.id}`,
				method: "put",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["WorkItems", "Stories", "Assigned"],
		}),
	}),
});

export const {
	useGetWorkItemQuery,
	useGetWorkItemsQuery,
	useAddWorkItemMutation,
	useUpdateWorkItemMutation,
} = workItemsApi;

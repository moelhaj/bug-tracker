import { api } from "../api";

export const workItemsApi = api.injectEndpoints({
	endpoints: builder => ({
		addWorkItem: builder.mutation({
			query: item => ({
				url: "/work-items",
				method: "POST",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["WorkItems", "ProductBacklogItem"],
		}),
		updateWorkItem: builder.mutation({
			query: item => ({
				url: `/work-items/${item.id}`,
				method: "put",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["WorkItems", "ProductBacklogItem"],
		}),
	}),
});

export const { useAddWorkItemMutation, useUpdateWorkItemMutation } = workItemsApi;

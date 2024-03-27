import { api } from "../api";

export const assignedApi = api.injectEndpoints({
	endpoints: builder => ({
		getAssigned: builder.query<any, unknown>({
			query: () => "assigned",
			providesTags: ["Assigned"],
		}),
	}),
});

export const { useGetAssignedQuery } = assignedApi;

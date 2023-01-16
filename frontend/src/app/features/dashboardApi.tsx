import { api } from "../api";

export const dashboardApi = api.injectEndpoints({
	endpoints: builder => ({
		getMetrics: builder.query<any, unknown>({
			query: (filters: any) => "dashboard",
			providesTags: ["Projects"],
		}),
	}),
});

export const { useGetMetricsQuery } = dashboardApi;

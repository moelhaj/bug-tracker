import { api } from "../api";

export const dashboardApi = api.injectEndpoints({
	endpoints: builder => ({
		getMetrics: builder.query<any, unknown>({
			query: () => "dashboard",
			providesTags: ["Dashboard"],
		}),
	}),
});

export const { useGetMetricsQuery } = dashboardApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3500/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }: { getState: any }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const api = createApi({
	baseQuery: baseQuery,
	tagTypes: ["Dashboard", "Projects", "WorkItems", "Notifications", "Users"],
	endpoints: builder => ({}),
});

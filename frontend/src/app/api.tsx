import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3500/api",
	credentials: "include",
	prepareHeaders: (headers, { getState }: { getState: any }) => {
		const token = getState().user.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const api = createApi({
	baseQuery: baseQuery,
	tagTypes: [
		"Dashboard",
		"Assigned",
		"Projects",
		"ProductBacklogItem",
		"WorkItems",
		"Notifications",
		"Users",
	],
	endpoints: builder => ({}),
});

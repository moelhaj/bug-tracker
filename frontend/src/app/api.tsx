import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BACKEND_API_URL,
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
		"WorkItems",
		"Notifications",
		"Users",
		"Stories",
	],
	endpoints: builder => ({}),
});

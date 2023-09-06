import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeCredentials } from "./slices/userSlice";

const baseQuery: any = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BACKEND_URL,
	credentials: "include",
	prepareHeaders: (headers, { getState }: { getState: any }) => {
		const token = getState().user.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithVerify = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result?.error?.originalStatus === 401) {
		api.dispatch(removeCredentials());
	}

	return result;
};

export const appApi = createApi({
	baseQuery: baseQueryWithVerify,
	tagTypes: ["Expenses"],
	endpoints: (builder: any) => ({}),
});

import { api } from "../api";

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<any, unknown>({
			query: () => "users",
			providesTags: ["Users"],
		}),
	}),
});

export const { useGetUsersQuery } = usersApi;

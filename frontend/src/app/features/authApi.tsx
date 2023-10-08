import { api } from "../api";
import { removeCredentials, setCredentials } from "../slices/userSlice";

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(removeCredentials());
					setTimeout(() => {
						dispatch(api.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),
		refresh: builder.mutation<any, void>({
			query: () => ({
				url: "/auth/refresh",
				method: "GET",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken, employee } = data;
					dispatch(setCredentials({ accessToken, employee }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = authApi;

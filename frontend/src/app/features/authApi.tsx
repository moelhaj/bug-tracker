import { appApi } from "../api";

export const authApi = appApi.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/register",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		forgetPassword: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/forget-password",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		resetPassword: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/reset-password",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		verifyToken: builder.mutation({
			query: (credentials: any) => ({
				url: "/auth/verify-token",
				method: "POST",
				body: { ...credentials },
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useForgetPasswordMutation,
	useResetPasswordMutation,
	useVerifyTokenMutation,
} = authApi;

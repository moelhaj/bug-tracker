import { api } from "../api";

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<any, unknown>({
			query: () => "users",
			providesTags: ["Users"],
		}),
		// getProjects: builder.query<any, unknown>({
		// 	query: (filters: any) => `/projects?filters=${JSON.stringify(filters)}`,
		// 	providesTags: ["Projects"],
		// }),
		// getProject: builder.query<any, string | undefined>({
		// 	query: id => `/projects/${id}`,
		// 	providesTags: ["Projects"],
		// }),
		// addNewProject: builder.mutation({
		// 	query: initialProject => ({
		// 		url: "/projects",
		// 		method: "POST",
		// 		body: {
		// 			...initialProject,
		// 		},
		// 	}),
		// 	invalidatesTags: ["Projects"],
		// }),
		// updateProject: builder.mutation({
		// 	query: initialProject => ({
		// 		url: "/projects",
		// 		method: "PATCH",
		// 		body: {
		// 			...initialProject,
		// 		},
		// 	}),
		// 	invalidatesTags: ["Projects"],
		// }),
		// deleteProject: builder.mutation({
		// 	query: ({ id }) => ({
		// 		url: "/projects",
		// 		method: "DELETE",
		// 		body: { id },
		// 	}),
		// 	invalidatesTags: ["Projects"],
		// }),
	}),
});

export const { useGetUsersQuery } = usersApi;

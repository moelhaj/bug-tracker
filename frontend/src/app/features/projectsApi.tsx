import { api } from "../api";

type Project = {
	id: number;
	title: string;
	details: string;
	status: string;
	workItems: any;
	users: any;
	usersIDs: any;
	createdAt: Date;
};

type ProjectsResponse = Project[];

export const projectsApi = api.injectEndpoints({
	endpoints: builder => ({
		getProjects: builder.query<ProjectsResponse, void>({
			query: () => "/projects",
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: "Projects" as const, id })),
							{ type: "Projects", id: "LIST" },
					  ]
					: [{ type: "Projects", id: "LIST" }],
		}),
		getProject: builder.query<Project, string | undefined>({
			query: id => `/projects/${id}`,
			providesTags: ["Projects"],
		}),
		addProject: builder.mutation({
			query: initialProject => ({
				url: "/projects",
				method: "POST",
				body: {
					...initialProject,
				},
			}),
			invalidatesTags: [{ type: "Projects", id: "LIST" }],
		}),
		updateProject: builder.mutation({
			query: initialProject => ({
				url: "/projects",
				method: "PATCH",
				body: {
					...initialProject,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Projects", id: arg.id }],
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useGetProjectQuery,
	useAddProjectMutation,
	useUpdateProjectMutation,
} = projectsApi;

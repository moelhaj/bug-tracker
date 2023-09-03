import { appApi } from "../api";

type Expense = {
	id?: string;
	title: string;
	details: string;
	amount: string;
	category: string;
	userId?: string;
};

type ExpenseResponse = Expense[];

export const expensesApi = appApi.injectEndpoints({
	endpoints: build => ({
		getExpenses: build.query<ExpenseResponse, void>({
			query: () => "/expenses",
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: "Expenses" as const, id })),
							{ type: "Expenses", id: "LIST" },
					  ]
					: [{ type: "Expenses", id: "LIST" }],
		}),
		addExpense: build.mutation<Expense, Partial<Expense>>({
			query(body: any) {
				return {
					url: "/expenses",
					method: "POST",
					body,
				};
			},
			invalidatesTags: [{ type: "Expenses", id: "LIST" }],
		}),
		updateExpense: build.mutation<Expense, Partial<Expense>>({
			query(expense: any) {
				const { id } = expense;
				return {
					url: `expenses/${id}`,
					method: "PUT",
					body: expense,
				};
			},
			invalidatesTags: (result: any, error: any, { id }: any) => [{ type: "Expenses", id }],
		}),
		deleteExpense: build.mutation<{ success: boolean; id: number }, number>({
			query(id: any) {
				return {
					url: `expenses/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (result: any, error: any, { id }: any) => [{ type: "Expenses", id }],
		}),
		filterExpense: build.mutation<any, any>({
			query(body: any) {
				return {
					url: "/expenses/filter",
					method: "POST",
					body,
				};
			},
		}),
	}),
});

export const {
	useGetExpensesQuery,
	useAddExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
	useFilterExpenseMutation,
} = expensesApi;

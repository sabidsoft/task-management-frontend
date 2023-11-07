import { apiSlice } from "../apiSlice/apiSlice";
import { TaskResponse, TasksResponse } from "./types";

// Creating API endpoints for task-related actions
export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch a list of tasks
        getTasks: builder.query<TasksResponse, { search: string, page: number }>({
            query: ({ search, page }) => ({
                url: `/api/v1/tasks?search=${search}&page=${page}&limit=${5}`
            }),
            keepUnusedDataFor: 600, // default 60 seconds
            providesTags: ['Tasks']
        }),

        // Fetch a single task by its ID
        getTask: builder.query<TaskResponse, string>({
            query: (taskId) => ({
                url: `/api/v1/tasks/${taskId}`
            }),
            providesTags: (result, error, arg) => [{ type: 'Task', id: arg }]
        }),

        // Fetch tasks filtered by a specific user
        getTasksByUser: builder.query<TasksResponse, { userId: string, search: string, page: number }>({
            query: ({ userId, search, page }) => ({
                url: `/api/v1/tasks?creatorId=${userId}&search=${search}&page=${page}&limit=${5}`
            }),
            providesTags: (result, error, arg) => [{ type: 'TasksByUser', id: arg.userId }]
        }),

        // Create a new task
        createTask: builder.mutation<any, { title: string, description: string, completed: boolean }>({
            query: (formData) => ({
                url: "/api/v1/tasks",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['TasksByUser']
        }),

        // Delete a task by its ID
        deleteTask: builder.mutation<any, string>({
            query: (taskId) => ({
                url: `/api/v1/tasks/${taskId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Task', 'TasksByUser', 'TasksBySearch']
        }),

        // Update an existing task by its ID
        updateTask: builder.mutation<any, { taskId: string, formData: { title: string, description: string, completed: boolean } }>({
            query: ({ taskId, formData }) => ({
                url: `/api/v1/tasks/${taskId}`,
                method: "PATCH",
                body: formData
            }),
            invalidatesTags: ['Task', 'TasksByUser', 'TasksBySearch']
        }),
    })
})

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useGetTasksByUserQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation
} = tourApi;

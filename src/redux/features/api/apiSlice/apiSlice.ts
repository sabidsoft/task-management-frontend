import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';

// Creating an API slice for task management
export const apiSlice = createApi({
    reducerPath: 'taskManagementApi',
    tagTypes: ['Task', 'Tasks', 'TasksByUser', 'TasksBySearch'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://task-management-backend-sabid.vercel.app',
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
});
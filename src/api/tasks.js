import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/tasks',
    }),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => `/getAllTasks`,
        }),
    }),
})

export const { useGetAllTasksQuery } = tasksApi
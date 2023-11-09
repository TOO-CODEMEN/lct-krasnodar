import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/tasks',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getTasksByUserId: builder.query({
            query: (id) => `/getTasksByUserId/${id}`,
        }),
        getTasksByCourseId: builder.query({
            query: (id) => `/getTasksByCourseId/${id}`,
        }),
    }),
})

export const { useGetTasksByUserIdQuery, useGetTasksByCourseIdQuery } = tasksApi
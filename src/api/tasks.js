import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getTasksByUserId: builder.query({
            query: (id) => `/tasks/getTasksByUserId/${id}`,
        }),
        getAllTasks: builder.query({
            query: () => `/tasks/getAllTasks`,
        }),
        saveTask: builder.mutation({
            query: (body) => ({
                url: '/admin/tasks/saveTask',
                method: 'POST',
                body
            })
        }),
        updateTask: builder.mutation({
            query: (body) => ({
                url: `/tasks/updateTask/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/admin/tasks/deleteTask/${id}`,
                method: 'DELETE'
            })
        }),
        getTasksByCourseId: builder.query({
            query: (id) => `/getTasksByCourseId/${id}`,
        }),
    }),
})

export const { useGetTasksByUserIdQuery,
            useGetAllTasksQuery,
            useSaveTaskMutation,
            useDeleteTaskMutation,
            useUpdateTaskMutation,
            useGetTasksByCourseIdQuery } = tasksApi
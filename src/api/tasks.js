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
        getAllTasks: builder.query({
            query: () => `/getAllTasks`,
        }),
        saveTask: builder.mutation({
            query: (body) => ({
                url: '/saveTask',
                method: 'POST',
                body
            })
        }),
        updateTask: builder.mutation({
            query: (body) => ({
                url: `/updateTask/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/deleteTask/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetTasksByUserIdQuery, useGetAllTasksQuery, useSaveTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
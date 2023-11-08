import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/users',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/getAllUsers`,
        }),
        getUser: builder.query({
            query: (email) => `/showUserInfo/${email}`
        }),
        saveUser: builder.mutation({
            query: (body) => ({
                url: '/saveUser',
                method: 'POST',
                body
            })
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `/updateUser/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetAllUsersQuery, useGetUserQuery, useSaveUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApi
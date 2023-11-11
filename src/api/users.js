import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/admin/users/getAllUsers`,
        }),
        getUser: builder.query({
            query: (email) => `/users/showUserInfo/${email}`
        }),
        saveUser: builder.mutation({
            query: (body) => ({
                url: '/admin/users/saveUser',
                method: 'POST',
                body
            })
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `/users/updateUser/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/deleteUser/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetAllUsersQuery,
            useGetUserQuery,
            useSaveUserMutation,
            useDeleteUserMutation,
            useUpdateUserMutation } = usersApi
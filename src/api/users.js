import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/users',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
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
        })
    }),
})

export const { useGetAllUsersQuery, useGetUserQuery, useSaveUserMutation } = usersApi
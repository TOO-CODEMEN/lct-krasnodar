import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/users',
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/getAllUsers`,
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

export const { useGetAllUsersQuery, useSaveUserMutation } = usersApi
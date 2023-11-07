import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/users',
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
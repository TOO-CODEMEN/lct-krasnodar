import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const curatorApi = createApi({
    reducerPath: 'curatorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getCurator: builder.query({
            query: (email) => `/admin/curators/showCuratorInfo/${email}`
        }),
        updateCurator: builder.mutation({
            query: (body) => ({
                url: `/admin/curators/updateCuratorById/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
    })
})

export const { useGetCuratorQuery, useUpdateCuratorMutation } = curatorApi
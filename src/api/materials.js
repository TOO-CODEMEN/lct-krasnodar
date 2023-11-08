import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const materialsApi = createApi({
    reducerPath: 'materialsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/materials',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getAllMaterials: builder.query({
            query: () => `/getAllMaterials`,
        }),
        saveMaterial: builder.mutation({
            query: (body) => ({
                url: '/saveMaterial',
                method: 'POST',
                body
            })
        })
    }),
})

export const { useGetAllMaterialsQuery, useSaveMaterialMutation } = materialsApi
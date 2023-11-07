import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const materialsApi = createApi({
    reducerPath: 'materialsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/materials',
    }),
    endpoints: (builder) => ({
        getAllMaterials: builder.query({
            query: () => `/getAllMaterials`,
        }),
    }),
})

export const { useGetAllMaterialsQuery } = materialsApi
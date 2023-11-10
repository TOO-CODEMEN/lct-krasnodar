import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const materialsApi = createApi({
    reducerPath: 'materialsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getAllMaterials: builder.query({
            query: () => `/materials/getAllMaterials`,
        }),
        getMaterialsByCourseId: builder.query({
            query: (id) => `/materials/getMaterialsByCourseId/${id}`,
        }),
        saveMaterial: builder.mutation({
            query: (body) => ({
                url: '/admin/materials/saveMaterial',
                method: 'POST',
                body
            })
        }),
        updateMaterial: builder.mutation({
            query: (body) => ({
                url: `/admin/materials/updateMaterial/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteMaterial: builder.mutation({
            query: (id) => ({
                url: `/admin/materials/deleteMaterialById/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetAllMaterialsQuery, useSaveMaterialMutation, useDeleteMaterialMutation, useUpdateMaterialMutation, useGetMaterialsByCourseIdQuery } = materialsApi
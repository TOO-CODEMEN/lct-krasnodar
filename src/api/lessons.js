import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api/courses',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getCoursesByUserId: builder.query({
            query: (id) => `/getCoursesByUserId/${id}`,
        }),
    }),
})

export const { useGetCoursesByUserIdQuery } = lessonApi
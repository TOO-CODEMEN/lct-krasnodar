import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.232.161.161:8080/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }),
    endpoints: (builder) => ({
        getCoursesByUserId: builder.query({
            query: (id) => `/courses/getCoursesByUserId/${id}`,
        }),
        getAllCourses: builder.query({
            query: () => `/courses/getAllCourses`,
        }),
        saveCourse: builder.mutation({
            query: (body) => ({
                url: '/admin/courses/saveCourse',
                method: 'POST',
                body
            })
        }),
        updateCourse: builder.mutation({
            query: (body) => ({
                url: `/courses/updateCourseById/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/admin/courses/deleteCourseById/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetAllCoursesQuery,
            useSaveCourseMutation,
            useDeleteCourseMutation,
            useUpdateCourseMutation,
            useGetCoursesByUserIdQuery } = coursesApi
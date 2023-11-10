import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
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
        getAllCourses: builder.query({
            query: () => `/getAllCourses`,
        }),
        saveCourse: builder.mutation({
            query: (body) => ({
                url: '/saveCourse',
                method: 'POST',
                body
            })
        }),
        updateCourse: builder.mutation({
            query: (body) => ({
                url: `/updateCourse/${body.id}`,
                method: 'PATCH',
                body
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/deleteCourseById/${id}`,
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetAllCoursesQuery, useSaveCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation, useGetCoursesByUserIdQuery } = coursesApi
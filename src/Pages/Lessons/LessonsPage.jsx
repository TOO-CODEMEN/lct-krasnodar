import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Lessons.module.scss'
import { useGetCoursesByUserIdQuery } from '../../api/courses'
import { useSelector } from 'react-redux'
import { Course } from './Course/Course'

export const LessonsPage = () => {
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
    return (
        <div className={styles.lessons}>
            <div>
                {isError ? <div className={styles.lessons__center}>Непредвиденная ошибка</div> : isFetching ? <CircularProgress />
                    : data.length > 0 ?

                        data.map((course, key) =>
                            <Course course={course} />
                        )

                        : <div className={styles.lessons__center}>На данный момент модулей нет</div>
                }
            </div>
        </div>
    )
}
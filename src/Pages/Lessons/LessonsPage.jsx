import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Lessons.module.scss'
import { useGetCoursesByUserIdQuery } from '../../api/lessons'
import { useSelector } from 'react-redux'


export const LessonsPage = () => {
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))

    return (
        <div className={styles.lessons}>
            <h1 className={styles.lessons__title}>
                Курсы
            </h1>
            <div>
                {isError ? <div className={styles.lessons__center}>Непредвиденная ошибка</div> : isFetching ? <CircularProgress />
                    : data.length > 0 ? data.map((elem, key) => <div>{elem.name}</div>) : <div className={styles.lessons__center}>На данный момент модулей нет</div>
                }
            </div>
        </div>
    )
}
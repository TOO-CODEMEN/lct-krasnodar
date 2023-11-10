import React from 'react'
import styles from './Plan.module.scss'
import { useGetTasksByCourseIdQuery, useGetTasksByUserIdQuery } from '../../api/tasks'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { PlanCard } from './PlanCard/PlanCard'
import { useGetCoursesByUserIdQuery } from '../../api/courses'

export const PlanPage = () => {
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
    if (data ) {
        var courseId = data[2].id
    }
    const { isError: error, isFetching: fetching, data: dataTasks } = useGetTasksByCourseIdQuery(courseId) 

    return (
        <div className={styles.plan}>
            <h1 className={styles.plan__title}>
                План
            </h1>
            {isError ?
                <div className={styles.plan__note}>Ошибка, попробуйте обновить страницу</div>
                : isFetching ?
                    <div className={styles.center}> <CircularProgress /></div>
                    :
                    dataTasks && dataTasks.length > 0 ?
                        <div>
                            <div className={styles.plan__data__length}>Необходимо выполнить: {dataTasks.length}</div>
                            {dataTasks.map((elem, key) =>
                                <PlanCard data={elem} key={key}/>
                            )}
                        </div>
                        : <div className={styles.plan__note}>
                            Задач на данный момент нет
                        </div>
            }
        </div>
    )
}
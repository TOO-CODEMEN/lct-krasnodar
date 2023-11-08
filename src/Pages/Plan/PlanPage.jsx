import React from 'react'
import styles from './Plan.module.scss'
import { useGetTasksByUserIdQuery } from '../../api/tasks'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { PlanCard } from './PlanCard/PlanCard'

export const PlanPage = () => {
    const { isError, isFetching, data } = useGetTasksByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
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
                    data.length > 0 ?
                        <div>
                            <div className={styles.plan__data__length}>Необходимо выполнить: {data.length}</div>
                            {data.map((elem, key) =>
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
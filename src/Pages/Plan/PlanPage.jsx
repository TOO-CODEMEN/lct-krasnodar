import React from 'react'
import styles from './Plan.module.scss'
import { useGetTasksByUserIdQuery } from '../../api/tasks'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { PlanCard } from './PlanCard/PlanCard'
import { useGetCoursesByUserIdQuery } from '../../api/courses'
import { PlanPanel } from './PlanPanel/PlanPanel'

export const PlanPage = () => {
    const { isError, isFetching, data, refetch } = useGetTasksByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))

    return (
        <div className={styles.plan}>
            <h1 className={styles.plan__title}>
                План
            </h1>
            <PlanPanel refetch={refetch} data={data} isError={isError} isFetching={isFetching}/>
        </div>
    )
}
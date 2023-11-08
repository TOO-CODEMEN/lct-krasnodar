import React from 'react'
import { useGetAllMaterialsQuery } from '../../api/materials'
import { CircularProgress } from '@mui/material'
import styles from './Lessons.module.scss'


export const LessonsPage = () => {
    const {isError, isFetching, data} = useGetAllMaterialsQuery()

    return (
        <div className={styles.lessons}>
           {isError ?  <div>Непредвиденная ошибка</div> : isFetching ? <CircularProgress /> 
           : data.length > 0 ? data.map((elem, key) => <div>{elem.name}</div>) : <div>На данный момент модулей нет</div>
           }
        </div>
    )
}
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import styles from '../Plan.module.scss'
import { useGetTasksByUserIdQuery } from '../../../api/tasks'
import { PlanCard } from '../PlanCard/PlanCard'


export const PlanPanel = () => {
    const { isError, isFetching, data, refetch } = useGetTasksByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
    const currentDate = Date.now()
    const sortFalseData = data ? data.filter((elem) => !elem.status && currentDate <= new Date(elem.deadline)) : []
    const sortTrueData = data ? data.filter((elem) => elem.status) : []
    const sortFailData = data ? data.filter((elem) => !elem.status && currentDate >= new Date(elem.deadline)) : []

    return (
        <div>
            {isError ?
                <div className={styles.plan__note}>Ошибка, попробуйте обновить страницу</div>
                : isFetching ?
                    <div className={styles.center}> <CircularProgress /></div>
                    :
                    data && data.length > 0 ?
                        <div>
                            <div className={styles.plan__data__length}>Необходимо выполнить: {sortFalseData.length}</div>
                            <div className={styles.plan__data__flex}>
                                <div className={styles.plan__data__flex__info}>
                                    <div className={styles.plan__data__flex__info__title}>
                                        Выполненные
                                    </div>
                                    {sortTrueData.map((elem, key) =>
                                        <PlanCard data={elem} key={key} refetch={refetch} />
                                    )}
                                </div>
                                <div className={styles.plan__data__flex__info}>
                                    <div className={styles.plan__data__flex__info__title}>
                                        Невыполненные
                                    </div>
                                    {sortFalseData.map((elem, key) =>
                                        <PlanCard data={elem} key={key} refetch={refetch} isUpdating = {true}/>
                                    )}
                                </div>
                                <div className={styles.plan__data__flex__info}>
                                    <div className={styles.plan__data__flex__info__title}>
                                        Проваленные
                                    </div>
                                    {sortFailData.map((elem, key) =>
                                        <PlanCard data={elem} key={key} refetch={refetch} />
                                    )}
                                </div>
                            </div>
                        </div>
                        : <div className={styles.plan__note}>
                            Задач на данный момент нет
                        </div>
            }
        </div>
    )
}
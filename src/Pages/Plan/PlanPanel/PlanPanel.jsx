import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import styles from '../Plan.module.scss'
import { useGetTasksByUserIdQuery } from '../../../api/tasks'
import { PlanCard } from '../PlanCard/PlanCard'


export const PlanPanel = () => {
    const { isError, isFetching, data } = useGetTasksByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
    return (
        <div>
            {isError ?
                <div className={styles.plan__note}>Ошибка, попробуйте обновить страницу</div>
                : isFetching ?
                    <div className={styles.center}> <CircularProgress /></div>
                    :
                    data && data.length > 0 ?
                        <div>
                            <div className={styles.plan__data__length}>Необходимо выполнить: {data.length}</div>
                            {data.map((elem, key) =>
                                <PlanCard data={elem} key={key} />
                            )}
                        </div>
                        : <div className={styles.plan__note}>
                            Задач на данный момент нет
                        </div>
            }
        </div>
    )
}
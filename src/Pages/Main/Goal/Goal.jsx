import styles from './Goal.module.scss'
import { Button, CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import { useGetTasksByUserIdQuery, useUpdateTaskMutation } from '../../../api/tasks'
import { formatTimestamp } from '../../../utils/formatTimestamp'
import { useUpdateUserMutation } from '../../../api/users'
import { PlanCard } from '../../Plan/PlanCard/PlanCard'

const Goal = () => {
    const selector = useSelector((state) => state.user.currentUser)
    const { isError, isFetching, data, refetch } = useGetTasksByUserIdQuery(selector.id)
    const currentDate = Date.now()
    const sortData = data ? data.filter((elem) => !elem.status && currentDate <= new Date(elem.deadline)) : []

    const [updateTask] = useUpdateTaskMutation()
    const [updateUser] = useUpdateUserMutation()

    const updateTaskHandler = async (idTask) => {
        await updateTask({ id: idTask, status: true })
        await updateUser({ id: selector.id, completedTasks: selector.completedTasks + 1 })
        refetch()
    }

    return (
        <div className={styles.Goal}>
            {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> : sortData && sortData.length > 0 ?
                <div>
                    <h2>
                        Цель: {sortData[0].name}
                    </h2>
                    <div className={styles.Goal_description}>
                        {sortData[0].description}
                    </div>

                    <div className={styles.Goal__flex}>
                        <div>
                            {sortData[0].status ? <span style={{ color: 'green' }}>Сделано</span> :
                                <div>
                                    <span style={{ color: 'red' }}>Не сделано</span>
                                    {new Date(sortData[0].deadline) <= currentDate ? null : <Button
                                        onClick={() => updateTaskHandler(sortData[0].id)}
                                    >Отметить выполнение</Button>}
                                </div>
                            }
                        </div>
                        <div>
                            Дедлайн: {formatTimestamp(sortData[0].deadline)}
                        </div>
                    </div>
                </div>
                : <div>Целей не найдено</div>}
        </div>
    )
}
export default Goal
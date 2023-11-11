import { Done } from '@mui/icons-material';
import { formatTimestamp } from '../../../utils/formatTimestamp';
import styles from './PlanCard.module.scss'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux';
import { useUpdateTaskMutation } from '../../../api/tasks';
import { useUpdateUserMutation } from '../../../api/users';

export const PlanCard = ({ data, refetch, isUpdating = false }) => {
    const selector = useSelector((state) => state.user.currentUser)
    const currentDate = Date.now()

    const [updateTask] = useUpdateTaskMutation()
    const [updateUser] = useUpdateUserMutation()

    const updateTaskHandler = async (idTask) => {
        await updateTask({ id: idTask, status: true })
        await updateUser({ id: selector.id, completedTasks: selector.completedTasks + 1 })
        refetch()
    }

    return (
        <div className={styles.planCard}>
            <div className={styles.planCard__left}>
                <div className={styles.planCard__left__name}>
                    {data.name}
                </div>

                <div className={styles.planCard__left__desc}>
                    {data.description}
                </div>

                <div>
                    {data.status ? <span style={{ color: 'green' }}>Сделано</span> : <span style={{ color: 'red' }}>Не сделано</span>}
                </div>
            </div>

            <div className={styles.planCard__right}>
                Дедлайн: <b>{formatTimestamp(data.deadline, true)}</b>
            </div>

            {
                isUpdating ?
                    <div className={styles.planCard__done} onClick={() => updateTaskHandler(data.id)}>
                        <Done sx={{color: 'white'}}/>
                    </div> : null
            }
        </div>
    )
}
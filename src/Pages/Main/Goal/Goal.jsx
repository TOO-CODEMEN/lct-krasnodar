import styles from './Goal.module.scss'
import { CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import { useGetTasksByUserIdQuery } from '../../../api/tasks'
import { useGetCoursesByUserIdQuery } from '../../../api/lessons'

const Goal = () => {
    const selector = useSelector((state) => state.user.currentUser.id)
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(selector)
    console.log(data)
    if (data && data.length > 0 && data[0].tasks.length > 0) {
        var date = new Date(data[0].tasks[0].deadline)
    }

    return (
        <div className={styles.Goal}>
            {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> : data[0].tasks.length > 0 ?
                <div>
                    <h2>
                        Цель: {data[0].tasks.name}
                    </h2>
                    <div className={styles.Goal_description}>
                        {data[0].tasks.description}
                    </div>

                    <div className={styles.Goal__flex}>
                        <div>
                            {data[0].tasks.status ? <span style={{ color: 'green' }}>Сделано</span> : <span style={{ color: 'red' }}>Не сделано</span>}
                        </div>
                        <div>
                            Дедлайн: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
                        </div>
                    </div>
                </div>
                : <div>Целей не найдено</div>}
        </div>
    )
}
export default Goal
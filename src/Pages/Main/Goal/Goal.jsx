import styles from './Goal.module.scss'
import { CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import { useGetTasksByCourseIdQuery, useGetTasksByUserIdQuery } from '../../../api/tasks'
import { useGetCoursesByUserIdQuery } from '../../../api/courses'
import { formatTimestamp } from '../../../utils/formatTimestamp'

const Goal = () => {
    const selector = useSelector((state) => state.user.currentUser.id)
    const { isError, isFetching, data } = useGetTasksByUserIdQuery(selector) 
    console.log(data)

    return (
        <div className={styles.Goal}>
            {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> : data && data.length > 0 ?
                <div>
                    <h2>
                        Цель: {data[0].name}
                    </h2>
                    <div className={styles.Goal_description}>
                        {data[0].description}
                    </div>

                    <div className={styles.Goal__flex}>
                        <div>
                            {data[0].status ? <span style={{ color: 'green' }}>Сделано</span> : <span style={{ color: 'red' }}>Не сделано</span>}
                        </div>
                        <div>
                            Дедлайн: {formatTimestamp(data[0].deadline)}
                        </div>
                    </div>
                </div>
                : <div>Целей не найдено</div>}
        </div>
    )
}
export default Goal
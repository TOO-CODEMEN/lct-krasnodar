import styles from './Goal.module.scss'
import { CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import { useGetTasksByCourseIdQuery } from '../../../api/tasks'
import { useGetCoursesByUserIdQuery } from '../../../api/lessons'
import { formatTimestamp } from '../../../utils/script'

const Goal = () => {
    const selector = useSelector((state) => state.user.currentUser.id)
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(selector)
    console.log(data)

    if (data && data.length > 0) {
        var courseId = data[0].id
    }
    const { isError: error, isFetching: fetching, data: dataTasks } = useGetTasksByCourseIdQuery(courseId) 

    return (
        <div className={styles.Goal}>
            {error ? <div>Ошибка</div> : fetching ? <CircularProgress /> : dataTasks && dataTasks.length > 0 ?
                <div>
                    <h2>
                        Цель: {dataTasks[0].name}
                    </h2>
                    <div className={styles.Goal_description}>
                        {dataTasks[0].description}
                    </div>

                    <div className={styles.Goal__flex}>
                        <div>
                            {dataTasks[0].status ? <span style={{ color: 'green' }}>Сделано</span> : <span style={{ color: 'red' }}>Не сделано</span>}
                        </div>
                        <div>
                            Дедлайн: {formatTimestamp(dataTasks[0].deadline)}
                        </div>
                    </div>
                </div>
                : <div>Целей не найдено</div>}
        </div>
    )
}
export default Goal
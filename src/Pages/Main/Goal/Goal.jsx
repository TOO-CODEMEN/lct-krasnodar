import styles from './Goal.module.scss'
import { CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import { useGetTasksByCourseIdQuery } from '../../../api/tasks'
import { useGetCoursesByUserIdQuery } from '../../../api/courses'
import { formatTimestamp } from '../../../utils/script'

const Goal = () => {
    const selector = useSelector((state) => state.user.currentUser.id)
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(selector)

    if (data ) {
        var courseId = data[4].id
    }
    const { isError: error, isFetching: fetching, data: dataTasks } = useGetTasksByCourseIdQuery(courseId) 

    return (
        <div className={styles.Goal}>
            {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> : dataTasks && dataTasks.length > 0 ?
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
import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import { Support } from './Support/Support'
import { useGetTasksByUserIdQuery } from '../../api/tasks'
import { useSelector } from 'react-redux'

export const Main = () => {
    const { isError, isFetching, data } = useGetTasksByUserIdQuery(useSelector((state) => state.user.currentUser.id))
    return (
        <div className={styles.Main}>

            <Goal isError={isError} isFetching={isFetching} data={data} />
            <UsefulMaterials />
            <Support />
        </div>
    )
}
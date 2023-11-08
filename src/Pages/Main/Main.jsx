import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import { Support } from './Support/Support'
import { useGetAllTasksQuery } from '../../api/tasks'

export const Main = () => {
    const { isError, isFetching, data } = useGetAllTasksQuery()
    return (
        <div className={styles.Main}>

            <Goal isError={isError} isFetching={isFetching} data={data}/>
            <UsefulMaterials />
            <Support />
        </div>
    )
}
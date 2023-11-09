import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import Statistics  from './Statistics/Statistics'
import { useSelector } from 'react-redux'

export const Main = () => {
    const user = useSelector((state) => state.user.currentUser.name)
    return (
        <div className={styles.Main}>
            <div className={styles.Main__hello}>
                Привет, {user}!
            </div>
            <Goal/>
            <Statistics />
            <UsefulMaterials />
        </div>
    )
}
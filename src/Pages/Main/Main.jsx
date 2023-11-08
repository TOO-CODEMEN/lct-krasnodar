import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import Statistics  from './Statistics/Statistics'

export const Main = () => {
    return (
        <div className={styles.Main}>
            <Goal/>
            <Statistics />
            <UsefulMaterials />
        </div>
    )
}
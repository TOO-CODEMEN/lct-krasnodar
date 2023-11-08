import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'

export const Main = () => {
    return (
        <div className={styles.Main}>
            <Goal/>
            <UsefulMaterials />
        </div>
    )
}
import styles from './Main.module.scss'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import { Support } from './Support/Support'

export const Main = () => {
    return (
        <div className={styles.Main}>
            <Goal/>
            <UsefulMaterials/>
            <Support />
        </div>
    )
}
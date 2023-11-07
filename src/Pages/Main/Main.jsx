import styles from './Main.module.scss'
import Intro from './Intro/Intro'
import Goal from './Goal/Goal'
import UsefulMaterials from './UsefulMaterials/UsefulMaterials'
import { Support } from './Support/Support'

export const Main = () => {

    return (
        <div className={styles.Main}>
            <Intro/>
            <Goal/>
            <UsefulMaterials/>
            <Support />
        </div>
    )
}
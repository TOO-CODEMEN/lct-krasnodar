
import { formatTimestamp } from '../../../utils/formatTimestamp';
import styles from './PlanCard.module.scss'

export const PlanCard = ({ data }) => {
    return (
        <div className={styles.planCard}>
            <div className={styles.planCard__left}>
                <div className={styles.planCard__left__name}>
                    {data.name}
                </div>

                <div className={styles.planCard__left__desc}>
                    {data.description}
                </div>

                <div>
                    {data.status ? <span style={{ color: 'green' }}>Сделано</span> : <span style={{ color: 'red' }}>Не сделано</span>}
                </div>
            </div>

            <div className={styles.planCard__right}>
                Дедлайн: <b>{formatTimestamp(data.deadline, true)}</b>
            </div>
        </div>
    )
}
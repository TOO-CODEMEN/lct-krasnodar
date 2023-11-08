
import styles from './PlanCard.module.scss'

export const PlanCard = ({ data }) => {

    const timestamp = data && data.deadline
    const date = new Date(timestamp);
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
                Дедлайн: <b>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</b>
            </div>
        </div>
    )
}
import { Button } from '@mui/material'
import styles from './User.module.scss'

export const User = ({ user }) => {
    const date = new Date(user.startTime)

    return (
        <div className={styles.User}>
            <div className={styles.Info}>
                <div className={styles.FIO}>
                    {user.surname} {user.name} {user.patronymic}. Должность: {user.position}
                </div>
                <div className={styles.Contacts}>
                    <div>Телефон: <a href={`tel:${user.number}`}>{user.number}</a></div>
                    <div>Telegram: {user.telegram}</div>
                    <div>Email: {user.email}</div>
                </div>
                <div>Задач завершено: {user.completedTasks} </div>
                <div>Задач провалено: {user.failedTasks}</div>
                <div>Дата регистрации: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}</div>
            </div>
            <div className={styles.Actions}>
                <Button>Удалить пользователя</Button>
                <Button>Изменить пользователя</Button>
            </div>
        </div>
    )
}
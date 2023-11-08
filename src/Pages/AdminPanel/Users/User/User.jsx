import styles from './User.module.scss'

export const User = ({user}) => {
  return (
    <div className={styles.User}>{user.surname} {user.name} {user.patronymic}</div>
  )
}
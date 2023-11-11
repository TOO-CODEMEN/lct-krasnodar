import styles from './CourseTask.module.scss'

export const CourseTask = ({task}) => {
  return (
    <div className={styles.CourseTask}>
        <p>{task.name}</p>
        <p>Статус: {task.status ? (<span> Пройдено </span>) : ( <span> Не пройдено</span> )}</p>
    </div>
  )
}
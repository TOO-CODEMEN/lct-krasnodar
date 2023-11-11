import styles from './CourseMaterial.module.scss'

export const CourseMaterial = ({material}) => {
  return (
    <div className={styles.CourseMaterial}>
        <p>{material.name}</p>
        <p>{material.description}</p>
        <p><a href={material.link}>Ссылка на материал</a></p>
    </div>
  )
}
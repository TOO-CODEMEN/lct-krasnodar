import styles from './MaterialsItem.module.scss'

const MaterialsItem = ({tag, title, text, image}) => {
    return (
        <div className={styles.MaterialsItem}>
            <div className={styles.Content}>
                <div className={styles.Tag}>{tag}</div>
                <h3 className={styles.Title}>{title}</h3>
                {/* <p className={styles.Text}>{text}</p> */}
            </div>
            <img src={image} alt="Превью статьи" />
        </div>
    )
}
export default MaterialsItem
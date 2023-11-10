import styles from './MaterialsItem.module.scss'

const MaterialsItem = ({ tag, title, text, image, link, formYandex }) => {
    return (
        <div className={styles.MaterialsItem}>
            <div className={styles.Content}>
                <div className={styles.Tag}>{tag}</div>
                <h3 className={styles.Title}>{title}</h3>
                <p className={styles.Text}>{text}</p>
                <div className={styles.Important}>
                    Чтобы пройти материал, необходимо ознакомиться с информацией по ссылке и пройти тест.
                </div>

                <a href={link} className={styles.Link}>
                    Ссылка на материал
                </a>
                <a href={formYandex} className={styles.Link}>
                    Ссылка на тест
                </a>
            </div>
            <img src={image} alt="Превью статьи" />
        </div>
    )
}
export default MaterialsItem
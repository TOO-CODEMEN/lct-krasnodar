import MaterialsItem from './MaterialsItem/MaterialsItem'
import styles from './UsefulMaterials.module.scss'
import material1 from '../../../assets/material1.jpg'
import material2 from '../../../assets/material2.jpg'

const UsefulMaterials = () => {
    return (
        <div className={styles.UsefulMaterials}>
            <h2 >Советуем пройти: </h2>
            <div className={styles.MaterialsItems}>
                <MaterialsItem
                    tag="Урбанизм"
                    title="Долой старье! Как современные проблемы урбанизма влияют на архитектуру старого города"
                    text="Чтобы не нажимать лишние кнопки и не переживать, что в квартиру кто-то влез, пока вы на работе.Чтобы не нажимать лишние кнопки и не переживать, что в квартиру кто-то влез, пока вы на работе.Чтобы не нажимать лишние кнопки и не переживать, что в квартиру кто-то влез, пока вы на работе.Чтобы не нажимать лишние кнопки и не переживать, что в квартиру кто-то влез, пока вы на работе.Чтобы не нажимать лишние кнопки и не переживать, что в квартиру кто-то влез, пока вы на работе."
                    image={material1}
                />
            </div>
        </div>
    )
}
export default UsefulMaterials
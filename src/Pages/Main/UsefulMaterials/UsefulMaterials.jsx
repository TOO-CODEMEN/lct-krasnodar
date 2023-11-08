import MaterialsItem from './MaterialsItem/MaterialsItem'
import styles from './UsefulMaterials.module.scss'
import material1 from '../../../assets/material1.jpg'
import { useGetCoursesByUserIdQuery } from '../../../api/lessons'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

const UsefulMaterials = () => {

    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => state.user.currentUser.id))
    console.log(data)

    return (
        <div className={styles.UsefulMaterials}>
            <h2 >Советуем пройти: </h2>
            <div className={styles.MaterialsItems}>
                {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> :
                    data.length > 0 && data[0].materials.length > 0 ?
                    data[0].materials.map((elem, key) => <MaterialsItem tag="Важное" title={elem.name} text={elem.description} image={material1} key={key}/>) :
                    <div className={styles.MaterialsItems__nothing}>На данный момент материалов для изучения нет</div>
                }
            </div>
        </div>
    )
}
export default UsefulMaterials
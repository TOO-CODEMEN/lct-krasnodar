import MaterialsItem from './MaterialsItem/MaterialsItem'
import styles from './UsefulMaterials.module.scss'
import material1 from '../../../assets/material1.jpg'
import { useGetCoursesByUserIdQuery } from '../../../api/courses'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useGetMaterialsByCourseIdQuery } from '../../../api/materials'

const UsefulMaterials = () => {

    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => state.user.currentUser.id))
    if (data) {
        var courseId = data[0].id
    }
    const { isError: error, isFetching: fetching, data: dataMaterials } = useGetMaterialsByCourseIdQuery(courseId)
    console.log(dataMaterials)

    return (
        <div className={styles.UsefulMaterials}>
            <h2 >Советуем пройти: </h2>
            <div className={styles.MaterialsItems}>
                {error ? <div>Ошибка</div> : fetching ? <CircularProgress /> :
                    dataMaterials  && dataMaterials.length > 0 ?
                        dataMaterials.slice(0,3).map((elem, key) => <MaterialsItem tag="Важное" title={elem.name} text={elem.description} image={material1} key={key} link={elem.link} formYandex={elem.yandexFormsLink}/>) :
                        <div className={styles.MaterialsItems__nothing}>На данный момент материалов для изучения нет</div>
                }
            </div>
        </div>
    )
}
export default UsefulMaterials
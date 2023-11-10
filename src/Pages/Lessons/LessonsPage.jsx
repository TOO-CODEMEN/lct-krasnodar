import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Lessons.module.scss'
import { useGetCoursesByUserIdQuery } from '../../api/lessons'
import { useSelector } from 'react-redux'
import { formatTimestamp } from '../../utils/script'
import { useGetMaterialsByCourseIdQuery } from '../../api/materials'
import material1 from '../../assets/material1.jpg'
import MaterialsItem from '../Main/UsefulMaterials/MaterialsItem/MaterialsItem'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


export const LessonsPage = () => {
    const { isError, isFetching, data } = useGetCoursesByUserIdQuery(useSelector((state) => (state.user.currentUser.id)))
    if (data) {
        var courseId = data[0].id
    }
    const { isError: error, isFetching: fetching, data: dataMaterials } = useGetMaterialsByCourseIdQuery(courseId)
    console.log(data)
    return (
        <div className={styles.lessons}>
            <div>
                {isError ? <div className={styles.lessons__center}>Непредвиденная ошибка</div> : isFetching ? <CircularProgress />
                    : data.length > 0 ?
                        <div>
                            <div className={styles.flex}>
                                <h1 className={styles.lessons__title}>
                                    {data[0].name}
                                </h1>
                                <div className={styles.lessons__check}>
                                    Статус: {data[0].status ? <DoneIcon color='secondary'/> : <CloseIcon color='error'/>}
                                </div>
                            </div>

                            <div className={styles.lessons__deadline}>
                                Необходимо выполнить до: <span>{formatTimestamp(data[0].deadline, true)}</span>
                            </div>

                            <div className={styles.lessons__materialsTitle}>
                                Материалы
                            </div>

                            <div className={styles.lessons__materialsList}>
                                {dataMaterials && dataMaterials.length > 0 ?
                                    dataMaterials.map((elem, key) =>
                                        <div className={styles.lessons__materialsList__item}><MaterialsItem tag="Важное" title={elem.name} text={elem.description} image={material1} key={key} link={elem.link} formYandex={elem.yandexFormsLink}/></div>
                                    ) :
                                    <div>Материалы отсутствуют</div>
                                }
                            </div>
                        </div>
                        : <div className={styles.lessons__center}>На данный момент модулей нет</div>
                }
            </div>
        </div>
    )
}
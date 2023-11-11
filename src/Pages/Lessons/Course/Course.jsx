import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import material1 from '../../../assets/material1.jpg'
import { Close, Done } from '@mui/icons-material'
import { useGetMaterialsByCourseIdQuery } from '../../../api/materials';
import styles from '../Lessons.module.scss'
import MaterialsItem from '../../Main/UsefulMaterials/MaterialsItem/MaterialsItem';
import { formatTimestamp } from '../../../utils/formatTimestamp';
import { useGetTasksByCourseIdQuery } from '../../../api/tasks';
import { PlanCard } from '../../Plan/PlanCard/PlanCard';

export const Course = ({ course }) => {

    const { isError, isFetching, data: dataMaterials } = useGetMaterialsByCourseIdQuery(course.id)
    const { isError: errorTasks, isFetching: fetchingTasks, data: dataTasks} = useGetTasksByCourseIdQuery(course.id)
    return (
        <Accordion sx={{ marginBottom: '20px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <div className={styles.flex}>
                    <div>
                        <h1 className={styles.lessons__title}>
                            {course.name}
                        </h1>
                        <div className={styles.lessons__deadline}>
                            Необходимо выполнить до: <span>{formatTimestamp(course.deadline, true)}</span>
                        </div>
                    </div>
                    <div className={styles.lessons__check}>
                        Статус: {course.status ? <Done color='secondary' /> : <Close color='error' />}
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>

                <div className={styles.lessons__materialsTitle}>
                   Материалы
                </div>

                <div className={styles.lessons__materialsList}>
                    {isError ? <div>Ошибка</div> : isFetching ? <CircularProgress /> : dataMaterials && dataMaterials.length > 0 ?
                        dataMaterials.map((elem, key) =>
                            <div className={styles.lessons__materialsList__item}><MaterialsItem tag="Важное" title={elem.name} text={elem.description} image={material1} key={key} link={elem.link} formYandex={elem.yandexFormsLink} /></div>
                        ) :
                        <div>Материалы отсутствуют</div>
                    }
                </div>

                <div className={styles.lessons__materialsTitle}>
                   Задачи по курсу
                </div>

                <div className={styles.lessons__materialsList}>
                    {errorTasks ? <div>Ошибка</div> : fetchingTasks ? <CircularProgress /> : dataTasks && dataTasks.length > 0 ?
                        dataTasks.map((elem, key) =>
                            <div className={styles.lessons__materialsList__item}><PlanCard data={elem} key={key} /></div>
                        ) :
                        <div>Материалы отсутствуют</div>
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
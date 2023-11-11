import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, MenuItem, Modal } from '@mui/material'
import styles from './Course.module.scss'
import { useDeleteCourseMutation, useUpdateCourseMutation } from '../../../../api/courses'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCourse, updateCourse } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { formatTimestamp } from '../../../../utils/formatTimestamp'
import { useGetTasksByCourseIdQuery } from '../../../../api/tasks'
import { useGetMaterialsByCourseIdQuery } from '../../../../api/materials'
import { CourseMaterial } from './CourseMaterial/CourseMaterial'
import { CourseTask } from './CourseTask/CourseTask'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UISelect } from '../../../../Components/UISelect/UISelect'


export const Course = ({ users, course }) => {

    const { isError: tasksError, isFetching: tasksFetching, data: tasksData, refetch: tasksRefetch } = useGetTasksByCourseIdQuery(course.id)
    const { isError: materialsError, isFetching: materialsFetching, data: materialsData, refetch: materialsRefetch } = useGetMaterialsByCourseIdQuery(course.id)


    const {
        register,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            ...course,
            user: course.user.id,
            deadline: new Date(course.deadline).toISOString().slice(0, 16),
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const date = new Date(course.startTime)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()

    const [deleteCourseMutation] = useDeleteCourseMutation()
    const [updateCourseMutation] = useUpdateCourseMutation()

    const handleDelete = async () => {
        await deleteCourseMutation(course.id)
        dispatch(deleteCourse(course.id))
    }

    const onUpdate = async (data) => {
        data.deadline = Date.parse(data.deadline)
        const user = users.find(obj => obj.id == data.user)
        data.user = {
            id: data.user,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
        }
        await updateCourseMutation(data)
        dispatch(updateCourse(data))
        setModalActive(false)
    }

    const finishHandle = async (course) => {
        await updateCourseMutation({id: course.id, status: true, finishTime: Date.now()})
        const courseDispatch = {
            ...course,
            status: true,
            finishTime: Date.now()
        }
        dispatch(updateCourse(courseDispatch))
    }

    useEffect(() => {
        tasksRefetch()
        materialsRefetch()
    }, [])

    return (
        <>
            <div className={styles.Course}>
                <div className={styles.Info}>
                    <div className={styles.Name}>
                        {course.name}
                    </div>
                    <div className={styles.Description}>
                        Пользователь: {course.user.surname} {course.user.name} {course.user.patronymic}
                        <p>{course.user.email}</p>
                    </div>
                    <div>Дата создания: {formatTimestamp(course.startTime)}</div>
                    <div>Дедлайн: {formatTimestamp(course.deadline, true)}</div>
                    {course.finishTime ? (<div>Дата прохождения: {formatTimestamp(course.finishTime, true)}</div>) : null}
                </div>

                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить курс</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить курс</Button>
                    {course.status ? <></> : <Button onClick={() => finishHandle(course)}>Отметить прохождение</Button>}
                </div>
                <div className={styles.Accordions}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h3>Материалы курса ({materialsData && materialsData.length > 0 ? `${materialsData.length}` : '0'})</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            {materialsError ? (
                                <>Ошибка</>
                            ) : materialsFetching ? (
                                <CircularProgress />
                            ) : materialsData.length > 0 ? (
                                <>
                                    {materialsData.map((material) => (
                                        <CourseMaterial material={material} key={material.id} />
                                    ))}
                                </>
                            ) : (
                                <p>Материалов нет</p>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h3>Задачи курса ({tasksData && tasksData.length > 0 ? `${tasksData.length}` : '0'})</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            {tasksError ? (
                                <>Ошибка</>
                            ) : tasksFetching ? (
                                <CircularProgress />
                            ) : tasksData.length > 0 ? (
                                <>
                                    {tasksData.map((task) => (
                                        <CourseTask task={task} key={task.id} />
                                    ))}
                                </>
                            ) : (
                                <p>Задач нет</p>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div >
            <div className={styles.saveCourse}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование курса</h3>
                            <label>Название курса<input {...register("name")} /></label>
                            <UISelect name='user' control={control} label='Пользователь'>
                                {users ? users.map((user) => (
                                    <MenuItem value={user.id} key={user.id}>
                                        {user.surname} {user.name} {user.patronymic}
                                    </MenuItem>
                                )) : null}
                            </UISelect>
                            <label>Дедлайн <input type='datetime-local' {...register("deadline")} /></label>
                            <Button
                                variant="contained"
                                sx={style}
                                type='submit'
                            >Обновить</Button>
                            
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    )
}
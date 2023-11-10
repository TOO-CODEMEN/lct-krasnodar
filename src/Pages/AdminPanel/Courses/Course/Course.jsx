import { Button, Modal } from '@mui/material'
import styles from './Course.module.scss'
import { useDeleteCourseMutation, useUpdateCourseMutation } from '../../../../api/courses'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCourse, updateCourse } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const Course = ({ course }) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...course
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
        // await deleteCourseMutation(course.id)
        dispatch(deleteCourse(course.id))
    }

    const onUpdate = async (data) => {
        // await updateCourseMutation(data)
        dispatch(updateCourse(data))
        setModalActive(false)
    }


    return (
        <>
            <div className={styles.Course}>
                <div className={styles.Info}>
                    <div className={styles.Name}>
                        {course.name}
                    </div>
                    <div className={styles.Description}>
                        {course.description}
                    </div>
                    <div>Курс: {course.course?.name} </div>
                    <div><a href={course.link}>Ссылка на скачивание</a></div>
                    <div><a href={course.yandexFormsLink}>Ссылка на тест</a></div>
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить курс</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить курс</Button>
                </div>

            </div>
            <div className={styles.saveCourse}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                    <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование курса</h3>
                            <input
                                placeholder='Название материала'
                                {...register("name")} />
                            <input
                                placeholder='Описание'
                                {...register("description")} />
                            <input
                                placeholder='К какому курсу прикрепить материал'
                                {...register("course")} />
                            <input
                                placeholder='Ссылка на скачивание материала'
                                {...register("link")} />
                                <input
                                placeholder='Ссылка на тестирование'
                                {...register("yandexFormsLink")} />
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
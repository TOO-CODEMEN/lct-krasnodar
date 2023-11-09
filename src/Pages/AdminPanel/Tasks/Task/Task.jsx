import { Button, Modal } from '@mui/material'
import styles from './Task.module.scss'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../../api/tasks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { formatTimestamp } from '../../../../utils/script'

export const Task = ({ task }) => {

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...task, deadline: new Date(task.deadline).toISOString().slice(0, 16)
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const date = new Date(task.startTime)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()

    const [deleteTaskMutation] = useDeleteTaskMutation()
    const [updateTaskMutation] = useUpdateTaskMutation()

    const handleDelete = async () => {
        await deleteTaskMutation(task.id)
        dispatch(deleteTask(task.id))
    }

    const onUpdate = async (data) => {
        // await updateTaskMutation(data)
        dispatch(updateTask(data))
        setModalActive(false)
    }


    return (
        <>
            <div className={styles.Task}>
                <div className={styles.Info}>
                    <div className={styles.Name}>
                        {task.name}
                    </div>
                    <div className={styles.Description}>
                        {task.description}
                    </div>
                    <div>Курс: {task.course?.name} </div>
                    <div>Дедлайн: {formatTimestamp(task.deadline, true)}</div>
                    <div>Статус: {task.status ? <>Пройдено</> : <>Не пройдено</> }</div>
                    <div>Дата создания: {formatTimestamp(task.timeOfCreation)}</div>
                    
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить задачу</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить задачу</Button>
                </div>

            </div>
            <div className={styles.saveTask}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                    <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование задачи</h3>
                            <input
                                placeholder='Название задачи'
                                {...register("name")} />
                            <input
                                placeholder='Описание'
                                {...register("description")} />
                            <input
                                placeholder='Дедлайн'
                                type='datetime-local'
                                {...register("deadline")} />
                            <input
                                placeholder='Ссылка на тестирование'
                                {...register("link")} />
                            <input
                                placeholder='К какому курсу прикрепить задачу'
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
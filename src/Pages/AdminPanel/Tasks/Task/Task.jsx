import { Button, MenuItem, Modal } from '@mui/material'
import styles from './Task.module.scss'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../../api/tasks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { formatTimestamp } from '../../../../utils/script'
import { UISelect } from '../../../../Components/UISelect/UISelect'

export const Task = ({ users, courses, task }) => {

    const {
        register,
        handleSubmit,
        setValue,
        control
    } = useForm({
        defaultValues: {
            ...task,
            deadline: new Date(task.deadline).toISOString().slice(0, 16),
            user: task.user?.id,
            course: task.course?.id,
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1,
        alignSelf: 'flex-start'
    }

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()

    const [deleteTaskMutation] = useDeleteTaskMutation()
    const [updateTaskMutation] = useUpdateTaskMutation()

    const handleDelete = async () => {
        await deleteTaskMutation(task.id)
        dispatch(deleteTask(task.id))
    }

    const onUpdate = async (data) => {
        if (data.user) {
            const user = users.find(obj => obj.id == data.user)
            data.user = {
                id: data.user,
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic,
            }
        } else {
            const course = courses.find(obj => obj.id == data.course)
            data.course = {
                id: data.course,
                name: course.name
            }
        }
        data.deadline = Date.parse(data.deadline)
        await updateTaskMutation(data)
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
                    <div> {task.course ? <>Курс: {task.course?.name}</> : <>Пользователь: {task.user?.surname} {task.user?.name} {task.user?.patronymic}</>} </div>
                    <div>Дедлайн: {formatTimestamp(task.deadline, true)}</div>
                    <div>Статус: {task.status ? <>Пройдено</> : <>Не пройдено</>}</div>
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
                            <label>Название задачи <input {...register("name")} /></label>
                            <label>Описание <input {...register("description")} /></label>
                            <label>Дедлайн <input type='datetime-local' {...register("deadline")} /></label>
                            {users ? (
                                <>
                                    <UISelect control={control} label="К какому пользователю прикрепить задачу" name="user">
                                        {users.map((user) => (
                                            <MenuItem key={user.id} value={user.id}>
                                                {user.surname} {user.name} {user.patronymic}
                                            </MenuItem>
                                        ))}
                                    </UISelect>
                                </>
                            ) : courses ? (
                                <>
                                    <UISelect control={control} label="К какому курсу прикрепить задачу" name="course">
                                        {courses.map((user) => (
                                            <MenuItem key={user.id} value={user.id}>
                                                {user.surname} {user.name} {user.patronymic}
                                            </MenuItem>
                                        ))}
                                    </UISelect>
                                </>
                            ) : null}

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
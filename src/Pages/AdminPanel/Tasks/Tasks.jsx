import { Button, CircularProgress, Modal } from '@mui/material'
import styles from './Tasks.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllTasksQuery, useSaveTaskMutation } from '../../../api/tasks'
import { Task } from './Task/Task'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks } from '../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const Tasks = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            timeOfCreation: "",
            status: false
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveTaskMutation] = useSaveTaskMutation()
    const { isFetching, data, refetch } = useGetAllTasksQuery()
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.admin.tasks)

    const onSubmit = async (data) => {
        data.deadline = Date.parse(data.deadline)
        await saveTaskMutation(data).unwrap()
        refetch()
        setModalActive(false)
        reset()
    }

    useEffect(() => {
        data ? dispatch(setTasks(data)) : null
    }, [data])

    return (
        <div className='container'>
            <div className={styles.saveTask}>
                <Button
                    variant="contained"
                    sx={style}
                    onClick={() => setModalActive(true)}
                >Добавить задачу</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.taskFormWrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>Добавление задачи</h3>
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
                            >Добавить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className={styles.Tasks}>
                <h2>Все задачи</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : tasks ? (
                    <>
                        {tasks.map((task) => (
                            <Task task={task} key={task.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
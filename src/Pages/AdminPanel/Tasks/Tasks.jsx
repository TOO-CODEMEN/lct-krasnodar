import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, MenuItem, Modal } from '@mui/material'
import styles from './Tasks.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllTasksQuery, useSaveTaskMutation } from '../../../api/tasks'
import { Task } from './Task/Task'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks, updateTask } from '../../../redux/adminSlice'
import { UISelect } from '../../../Components/UISelect/UISelect'
import { useForm } from 'react-hook-form'
import { useGetAllCoursesQuery } from '../../../api/courses'
import { useGetAllUsersQuery } from '../../../api/users'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Tasks = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue
    } = useForm({
        defaultValues: {
            timeOfCreation: "",
            status: false,
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
    const [saveTaskMutation] = useSaveTaskMutation()
    const { isFetching, data, refetch } = useGetAllTasksQuery()
    const { data: coursesData } = useGetAllCoursesQuery()
    const { data: usersData } = useGetAllUsersQuery()
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.admin.tasks)
    const usersTasks = tasks.filter((task) => task.user)
    const coursesTasks = tasks.filter((task) => task.course)

    const onSubmit = async (data) => {
        delete data.courseCheck
        delete data.userCheck
        if (data.user) {
            data.user = {
                id: data.user
            }
            data.course = null
        }
        if (data.course) {
            data.course = {
                id: data.course
            }
            data.user = null
        }
        data.deadline = Date.parse(data.deadline)
        const formattedData = {
            ...data,
            timeOfCreation: Date.now()
        }
        await saveTaskMutation(formattedData).unwrap()
        refetch()
        setModalActive(false)
        console.log(formattedData)
        reset()
        setSelectedOption(null)
    }

    useEffect(() => {
        data ? dispatch(setTasks(data)) : null
        refetch()
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
                            <label>Название задачи <input {...register("name")} /></label>
                            <label>Описание <input {...register("description")} /></label>
                            <label>Дедлайн <input type='datetime-local' {...register("deadline")} /></label>
                            <div className={styles.Purpose}>
                                <p>Выберите назначение задачи</p>
                                <label>
                                    <input
                                        type="radio"
                                        value="userCheck"
                                        checked={selectedOption === "userCheck"}
                                        onChange={handleOptionChange}
                                    />
                                    Для пользователя
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="courseCheck"
                                        checked={selectedOption === "courseCheck"}
                                        onChange={handleOptionChange}
                                    />
                                    Для курса
                                </label>

                                {selectedOption === "userCheck" && (
                                    <>
                                        {setValue('course', '')}
                                        <UISelect control={control} label="К какому пользователю прикрепить задачу" name="user">
                                            {usersData ? usersData.map((user) => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    {user.surname} {user.name} {user.patronymic}
                                                </MenuItem>
                                            )) : null}
                                        </UISelect>
                                    </>

                                )}

                                {selectedOption === "courseCheck" && (
                                    <>
                                        {setValue('user', '')}
                                        <UISelect control={control} label="К какому курсу прикрепить задачу" name="course">
                                            {coursesData ? coursesData.map((course) => (
                                                <MenuItem key={course.id} value={course.id}>
                                                    {course.surname} {course.name} {course.patronymic}
                                                </MenuItem>
                                            )) : null}
                                        </UISelect>
                                    </>
                                )}
                            </div>
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
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                <h3 className={styles.AccordionTitle}>Задачи пользователей</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                {usersTasks.map((task) => (
                                    <Task users={usersData} task={task} key={task.id} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                <h3 className={styles.AccordionTitle}>Задачи курсов</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                {coursesTasks.map((task) => (
                                    <Task courses={coursesData} task={task} key={task.id} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </>
                ) : null}
            </div>
        </div>
    )
}
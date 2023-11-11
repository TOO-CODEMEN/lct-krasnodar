import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material'
import styles from './Courses.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllCoursesQuery, useSaveCourseMutation } from '../../../api/courses'
import { Course } from './Course/Course'
import { useDispatch, useSelector } from 'react-redux'
import { setCourses } from '../../../redux/adminSlice'
import { Controller, useController, useForm } from 'react-hook-form'
import { UISelect } from '../../../Components/UISelect/UISelect'
import { useGetAllMaterialsQuery } from '../../../api/materials'
import { useGetAllUsersQuery } from '../../../api/users'
import { useGetAllTasksQuery } from '../../../api/tasks'

export const Courses = () => {
    const {
        register,
        handleSubmit,
        reset,
        control
    } = useForm({
        defaultValues: {
            status: false,
            materials : [],
            tasks: []
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1,
        alignSelf: 'flex-start'
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveCourseMutation] = useSaveCourseMutation()
    const { isError, isFetching, data, refetch } = useGetAllCoursesQuery()
    const { data: usersData } = useGetAllUsersQuery()
    const dispatch = useDispatch()
    const courses = useSelector(state => state.admin.courses)

    const onSubmit = async (data) => {
        data.deadline = Date.parse(data.deadline)
        data.startTime = Date.now()
        data.user = {
            id: data.user
        }
        await saveCourseMutation(data).unwrap()
        console.log(data)
        refetch()
        setModalActive(false)
        reset()
    }

    useEffect(() => {
        data ? dispatch(setCourses(data)) : null
        refetch()
    }, [data])

    return (
        <div className='container'>
            <div className={styles.saveCourse}>
                <Button
                    variant="contained"
                    sx={style}
                    onClick={() => setModalActive(true)}
                >Добавить курс</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.courseFormWrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>Добавление курса</h3>
                            <label>Название курса<input {...register("name")} /></label>
                            <UISelect name='user' control={control} label='Пользователь'>
                                {usersData ? usersData.map((user) => (
                                    <MenuItem value={user.id} key={user.id}>
                                        {user.name}
                                    </MenuItem>
                                )) : false}
                            </UISelect>
                            <label>Дедлайн <input type='datetime-local' {...register("deadline")} /></label>
                            <Button
                                variant="contained"
                                sx={style}
                                type='submit'
                            >Добавить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className={styles.Courses}>
                <h2>Все курсы</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : isError ? (
                    <>Ошибка</>
                ) : courses ? (
                    <>
                        {console.log(data)}
                        {courses.map((course) => (
                            <Course users={usersData} course={course} key={course.id} />
                        ))}
                    </>
                ) : <>Курсов нет</>}
            </div>
        </div>
    )
}
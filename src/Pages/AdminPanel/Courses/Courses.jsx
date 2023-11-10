import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material'
import styles from './Courses.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllCoursesQuery, useSaveCourseMutation } from '../../../api/courses'
import { Course } from './Course/Course'
import { useDispatch, useSelector } from 'react-redux'
import { setCourses } from '../../../redux/adminSlice'
import { Controller, useController, useForm } from 'react-hook-form'
import { UISelect } from '../../../Components/UISelect/UISelect'

export const Courses = () => {
    const {
        register,
        handleSubmit,
        reset,
        control
    } = useForm()

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveCourseMutation] = useSaveCourseMutation()
    const { isError, isFetching, data, refetch } = useGetAllCoursesQuery()
    const dispatch = useDispatch()
    const courses = useSelector(state => state.admin.courses)

    const onSubmit = async (data) => {
        // await saveCourseMutation(data).unwrap()
        console.log(data)
        // refetch()
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
                            <input
                                placeholder='Название материала'
                                {...register("name")} />
                            <input
                                placeholder='Описание'
                                {...register("description")} />
                            <UISelect name='course' control={control} defaultValue='10'>
                                <MenuItem value={'10'}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </UISelect>
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
                            <Course course={course} key={course.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
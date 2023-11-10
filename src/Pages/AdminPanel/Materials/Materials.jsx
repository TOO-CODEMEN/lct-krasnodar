import { Button, CircularProgress, MenuItem, Modal } from '@mui/material'
import styles from './Materials.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllMaterialsQuery, useSaveMaterialMutation } from '../../../api/materials'
import { Material } from './Material/Material'
import { useDispatch, useSelector } from 'react-redux'
import { setMaterials } from '../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { UISelect } from '../../../Components/UISelect/UISelect'
import { useGetAllCoursesQuery } from '../../../api/courses'

export const Materials = () => {
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
        paddingY: 1,
        alignSelf: 'flex-start'
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveMaterialMutation] = useSaveMaterialMutation()
    const { isFetching, data, refetch } = useGetAllMaterialsQuery()
    const { data: coursesData } = useGetAllCoursesQuery()
    const dispatch = useDispatch()
    const materials = useSelector(state => state.admin.materials)

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            course: {
                id: data.course
            }
        }
        await saveMaterialMutation(formattedData).unwrap()
        console.log(formattedData)
        refetch()
        setModalActive(false)
        reset()
    }

    useEffect(() => {
        data ? dispatch(setMaterials(data)) : null
        refetch()
    }, [data])

    return (
        <div className='container'>
            <div className={styles.saveMaterial}>
                <Button
                    variant="contained"
                    sx={style}
                    onClick={() => setModalActive(true)}
                >Добавить материал</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.materialFormWrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>Добавление материала</h3>
                            <label>Название материала <input {...register("name")} /></label>
                            <label>Описание <input {...register("description")} /></label>
                            <UISelect control={control} label="К какому курсу прикрепить материал" name='course' >
                                {coursesData ? (
                                    coursesData.map((course) => (
                                        <MenuItem
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.name}
                                        </MenuItem>
                                    ))
                                ) : null}
                            </UISelect>
                            <label>Ссылка на скачивание <input {...register("link")} /></label>
                            <label>Ссылка на тестирование <input {...register("yandexFormsLink")} /></label>
                            <Button
                                variant="contained"
                                sx={style}
                                type='submit'
                            >Добавить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className={styles.Materials}>
                <h2>Все материалы</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : materials && coursesData ? (
                    <>
                        {console.log(data)}
                        {materials.map((material) => (
                            <Material courses={coursesData} material={material} key={material.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
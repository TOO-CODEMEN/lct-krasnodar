import { Button, MenuItem, Modal } from '@mui/material'
import styles from './Material.module.scss'
import { useDeleteMaterialMutation, useUpdateMaterialMutation } from '../../../../api/materials'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMaterial, updateMaterial } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { UISelect } from '../../../../Components/UISelect/UISelect'

export const Material = ({ material, courses }) => {

    const {
        register,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            ...material,
            course: material.course?.id
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
    const dispatch = useDispatch()

    const [deleteMaterialMutation] = useDeleteMaterialMutation()
    const [updateMaterialMutation] = useUpdateMaterialMutation()

    const handleDelete = async () => {
        await deleteMaterialMutation(material.id)
        dispatch(deleteMaterial(material.id))
    }

    const onUpdate = async (data) => {
        const courseID = data.course
        const course = courses.find(obj => obj.id == courseID)
        const formattedData = {...data, course: {
            id: courseID,
            name: course.name
        }}
        await updateMaterialMutation(formattedData)
        dispatch(updateMaterial(formattedData))
        setModalActive(false)
    }


    return (
        <>
            <div className={styles.Material}>
                <div className={styles.Info}>
                    <div className={styles.Name}>
                        {material.name}
                    </div>
                    <div className={styles.Description}>
                        {material.description}
                    </div>
                    <div>Курс: {material.course?.name} </div>
                    <div><a href={material.link}>Ссылка на скачивание</a></div>
                    <div><a href={material.yandexFormsLink}>Ссылка на тест</a></div>
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить материал</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить материал</Button>
                </div>

            </div>
            <div className={styles.saveMaterial}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование материала</h3>
                            <label>Название материала <input {...register("name")} /></label>
                            <label>Описание <input {...register("description")} /></label>
                            <UISelect control={control} label="К какому курсу прикрепить материал" name='course' >
                                {courses ? (
                                    courses.map((course) => (
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
                            >Обновить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>


    )
}
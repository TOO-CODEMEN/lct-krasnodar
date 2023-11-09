import { Button, Modal } from '@mui/material'
import styles from './Material.module.scss'
import { useDeleteMaterialMutation, useUpdateMaterialMutation } from '../../../../api/materials'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMaterial, updateMaterial } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const Material = ({ material }) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...material
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const date = new Date(material.startTime)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()

    const [deleteMaterialMutation] = useDeleteMaterialMutation()
    const [updateMaterialMutation] = useUpdateMaterialMutation()

    const handleDelete = async () => {
        await deleteMaterialMutation(material.id)
        dispatch(deleteMaterial(material.id))
    }

    const onUpdate = async (data) => {
        await updateMaterialMutation(data)
        dispatch(updateMaterial(data))
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
import { Button, CircularProgress, Modal } from '@mui/material'
import styles from './Materials.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllMaterialsQuery, useSaveMaterialMutation } from '../../../api/materials'
import { Material } from './Material/Material'
import { useDispatch, useSelector } from 'react-redux'
import { setMaterials } from '../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const Materials = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            role: "USER",
            primaryOnboarding: false,
            startTime: ""
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveMaterialMutation] = useSaveMaterialMutation()
    const { isFetching, data, refetch } = useGetAllMaterialsQuery()
    const dispatch = useDispatch()
    const materials = useSelector(state => state.admin.materials)

    const onSubmit = async (data) => {
        await saveMaterialMutation(data).unwrap()
        console.log(data)
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
                            >Добавить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className={styles.Materials}>
                <h2>Все материалы</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : materials ? (
                    <>
                    {console.log(data)}
                        {materials.map((material) => (
                            <Material material={material} key={material.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
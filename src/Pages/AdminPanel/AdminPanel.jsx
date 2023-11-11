import { useDispatch, useSelector } from 'react-redux'
import styles from './AdminPanel.module.scss'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useUpdateCuratorMutation } from '../../api/curator'
import { updateAdmin } from '../../redux/userSlice'

export const AdminPanel = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm()
    const [updateCurator] = useUpdateCuratorMutation()
 
    useEffect(() => {
        setValue('vkGroupId', currentUser.vkGroupId)
        setValue('id', currentUser.id)
    }, [currentUser])

    const onSubmit = async (data) => {
        data.vkGroupId = +data.vkGroupId
        await updateCurator(data)
        dispatch(updateAdmin(data))
    }

    return (
        <div className={`container ${styles.Admin}`}>
            <h2>Личный кабинет</h2>
            <p>{currentUser.surname} {currentUser.name} {currentUser.patronymic}</p>
            <p>{currentUser.email}</p>

            <form onSubmit={handleSubmit(onSubmit)} >
                <h3>Изменение группы вк</h3>
                <label>
                    ID группы ВК
                    <input {...register('vkGroupId')}/>
                    <Button type='submit' variant='contained' sx={{maxWidth: '100px'}} >Изменить</Button>
                </label>
            </form>

        </div>
    )
}
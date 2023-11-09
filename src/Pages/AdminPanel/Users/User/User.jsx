import { Button, Modal } from '@mui/material'
import styles from './User.module.scss'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../../api/users'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const User = ({ user }) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...user
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

    const date = new Date(user.startTime)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()

    const [deleteUserMutation] = useDeleteUserMutation()
    const [updateUserMutation] = useUpdateUserMutation()

    const handleDelete = async () => {
        await deleteUserMutation(user.id)
        dispatch(deleteUser(user.id))
    }

    const onUpdate = async (data) => {
        console.log(data)
        // await updateUserMutation(form)
        dispatch(updateUser(data))
        setModalActive(false)
    }


    return (
        <>
            <div className={styles.User}>
                <div className={styles.Info}>
                    <div className={styles.FIO}>
                        {user.surname} {user.name} {user.patronymic}. Должность: {user.position}
                    </div>
                    <div className={styles.Contacts}>
                        <div>Телефон: <a href={`tel:${user.number}`}>{user.number}</a></div>
                        <div>Telegram: {user.telegram}</div>
                        <div>Email: {user.email}</div>
                    </div>
                    <div>Задач завершено: {user.completedTasks} </div>
                    <div>Задач провалено: {user.failedTasks}</div>
                    <div>Дата регистрации: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}</div>
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить пользователя</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить пользователя</Button>
                </div>

            </div>
            <div className={styles.saveUser}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                    <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование пользователя</h3>
                            <input
                                placeholder='Фамилия'
                                {...register("surname")} />
                            <input
                                placeholder='Имя'
                                {...register("name")} />
                            <input
                                placeholder='Отчество'
                                {...register("patronymic")} />
                            <input
                                placeholder='Электронная почта'
                                {...register("email")} />
                            <input
                                placeholder='Пароль'
                                {...register("password")} />
                            <input
                                placeholder='Должность'
                                {...register("position")} />
                            <input
                                placeholder='Номер телефона'
                                {...register("number")} />
                            <input
                                placeholder='Аккаунт Telegram'
                                {...register("telegram")} />
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
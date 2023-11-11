import { Button, MenuItem, Modal } from '@mui/material'
import styles from './User.module.scss'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../../api/users'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { formatTimestamp } from '../../../../utils/formatTimestamp'
import { UISelect } from '../../../../Components/UISelect/UISelect'
import { positions } from '../../../../data/positions'

export const User = ({ user }) => {
    const {
        register,
        handleSubmit,
        control
    } = useForm({
        defaultValues: {
            ...user,
            password: ''
        }
    })

    const style = {
        ":hover": { backgroundColor: '#f3234d' },
        backgroundColor: '#E55C78',
        borderRadius: 2,
        paddingY: 1
    }

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
        await updateUserMutation(data)
        dispatch(updateUser(data))
        setModalActive(false)
    }

    const finishHandle = async (data) => {
        const finishData = {...data, finishTime: Date.now()}
        const userID = data.id
        await updateUserMutation({id: userID, finishTime: Date.now()})
        dispatch(updateUser(finishData))
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
                    <div>Дата регистрации: {formatTimestamp(user.startTime)}</div>
                    <div>{user.finishTime ? <>Дата прохождения: {formatTimestamp(user.finishTime)}</> : null} </div>
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleDelete}>Удалить пользователя</Button>
                    <Button onClick={() => setModalActive(true)}>Изменить пользователя</Button>
                    <Button onClick={() => finishHandle(user)}>Отметить прохождение</Button>
                </div>

            </div>
            <div className={styles.saveUser}>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.updateFormWrapper}>
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <h3>Редактирование пользователя</h3>
                            <label>Фамилия <input {...register("surname")} /></label>
                            <label>Имя <input {...register("name")} /></label>
                            <label>Отчество <input {...register("patronymic")} /></label>
                            <label>Почта <input {...register("email")} /></label>
                            <label>Пароль <input {...register("password")} /></label>
                            <UISelect name="position" label="Должность" control={control}>
                                {positions.map((position) => (
                                    <MenuItem
                                        key={position}
                                        value={position}
                                    >
                                        {position}
                                    </MenuItem>
                                ))}
                            </UISelect>
                            <label>Номер телефона <input {...register("number")} /></label>
                            <label>Аккаунт Telegram <input {...register("telegram")} /></label>
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
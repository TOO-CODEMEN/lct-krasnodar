import { Button, Modal } from '@mui/material'
import styles from './User.module.scss'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../../api/users'
// import { Modal } from '../../../../Components/Modal/Modal'

import { Input } from '../../../../Components/Input/Input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../../../../redux/adminSlice'

export const User = ({ user }) => {

    const date = new Date(user.startTime)
    const [modalActive, setModalActive] = useState(false)
    const [form, setForm] = useState(user)
    const dispatch = useDispatch()

    const [deleteUserMutation] = useDeleteUserMutation()
    const [updateUserMutation] = useUpdateUserMutation()

    const handleDelete = async () => {
        await deleteUserMutation(user.id)
        dispatch(deleteUser(user.id))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        await updateUserMutation(form)
        dispatch(updateUser(form))
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
                        <form onSubmit={handleUpdate}>
                            <h3>Редактирование пользователя</h3>
                            <Input
                                required
                                label="Фамилия"
                                value={form.surname}
                                setValue={setForm}
                                object={form}
                                typeObject={'surname'}
                            />
                            <Input
                                required
                                label="Имя"
                                value={form.name}
                                setValue={setForm}
                                object={form}
                                typeObject={'name'}
                            />

                            <Input
                                required
                                label="Отчество"
                                value={form.patronymic}
                                setValue={setForm}
                                object={form}
                                typeObject={'patronymic'}
                            />
                            <Input
                                required
                                label="Электронная почта"
                                type='email'
                                value={form.email}
                                setValue={setForm}
                                object={form}
                                typeObject={'email'}
                            />
                            <Input
                                required
                                label="Пароль"
                                value={form.password}
                                setValue={setForm}
                                object={form}
                                typeObject={'password'}
                            />
                            <Input
                                required
                                label="Должность"
                                value={form.position}
                                setValue={setForm}
                                object={form}
                                typeObject={'position'}
                            />
                            <Input
                                required
                                label="Номер телефона"
                                value={form.number}
                                setValue={setForm}
                                object={form}
                                typeObject={'number'}
                            />
                            <Input
                                required
                                label="Аккаунт Telegram"
                                value={form.telegram}
                                setValue={setForm}
                                object={form}
                                typeObject={'telegram'}
                            />
                            <Button
                                variant="contained"
                                sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1 }}
                                type='submit'
                            >Обновить</Button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>


    )
}
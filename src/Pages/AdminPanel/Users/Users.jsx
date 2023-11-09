import { Button, CircularProgress, Modal, TextField } from '@mui/material'
import styles from './Users.module.scss'
import { useEffect, useState } from 'react'
import { Input } from '../../../Components/Input/Input'
import { useGetAllUsersQuery, useSaveUserMutation } from '../../../api/users'
import { User } from './User/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/adminSlice'

export const Users = () => {
    const initialForm = {
        name: "",
        surname: "",
        patronymic: "",
        password: "",
        position: "",
        email: "",
        number: "",
        telegram: "",
        startTime: "",
        primaryOnboarding: false,
        role: 'USER'
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveUserMutation] = useSaveUserMutation()
    const { isFetching, data, refetch } = useGetAllUsersQuery()
    const [form, setForm] = useState(initialForm)
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await saveUserMutation({ ...form, startTime: Date.now() }).unwrap()
        refetch()
        setModalActive(false)
        setForm(initialForm)
    }

    useEffect(() => {
        data ? dispatch(setUsers(data)) : null
    }, [data])

    return (
        <div className='container'>
            <div className={styles.saveUser}>
                <Button
                    variant="contained"
                    sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1, marginBottom: 3 }}
                    onClick={() => setModalActive(true)}
                >Создать пользователя</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.userFormWrapper}>

                        <form onSubmit={handleSubmit}>
                            <h3>Создание пользователя</h3>
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
                                sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1, alignSelf: 'flex-start' }}
                                type='submit'
                            >Создать</Button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className={styles.Users}>
                <h2>Все пользователи</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : users ? (
                    <>
                        {users.map((user) => (
                            <User user={user} key={user.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
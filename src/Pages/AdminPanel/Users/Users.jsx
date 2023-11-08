import { Button, CircularProgress, TextField } from '@mui/material'
import styles from './Users.module.scss'
import { Modal } from '../../../Components/Modal/Modal'
import { useState } from 'react'
import { Input } from '../../../Components/Input/Input'
import { useGetAllUsersQuery, useSaveUserMutation } from '../../../api/users'
import { User } from './User/User'

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
    const [saveUser, {fulfilledTimeStamp}] = useSaveUserMutation()
    const { isFetching, data, refetch } = useGetAllUsersQuery()
    const [form, setForm] = useState(initialForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await saveUser({...form, startTime: Date.now()}).unwrap()
        setModalActive(false)
        setForm(initialForm)
        refetch()
    }

    return (
        <div className='container'>
            <div className={styles.saveUser}>
                <Button
                    variant="contained"
                    sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1, marginBottom: 3 }}
                    onClick={() => setModalActive(true)}
                >Создать пользователя</Button>
                <Modal active={modalActive} setActive={setModalActive}>
                    <form onSubmit={handleSubmit}>
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
                        >Создать</Button>
                    </form>
                </Modal>
            </div>
            <div className={styles.Users}>
                <h2>Все пользователи</h2>
                {isFetching ? (
                    <CircularProgress />
                ) : data ? (
                    <>
                        {data.map((user) => (
                            <User refetch={refetch} user={user} key={user.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
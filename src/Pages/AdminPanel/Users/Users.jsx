import { Button, CircularProgress, Modal } from '@mui/material'
import styles from './Users.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllUsersQuery, useSaveUserMutation } from '../../../api/users'
import { User } from './User/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/adminSlice'
import { useForm } from 'react-hook-form'

export const Users = () => {
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
    const [saveUserMutation] = useSaveUserMutation()
    const { isFetching, data, refetch } = useGetAllUsersQuery()
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)

    const onSubmit = async (data) => {
        // await saveUserMutation({ ...form, startTime: Date.now() }).unwrap()
        console.log({ ...data, startTime: Date.now() })
        // refetch()
        setModalActive(false)
        reset()
    }

    useEffect(() => {
        data ? dispatch(setUsers(data)) : null
    }, [data])

    return (
        <div className='container'>
            <div className={styles.saveUser}>
                <Button
                    variant="contained"
                    sx={style}
                    onClick={() => setModalActive(true)}
                >Создать пользователя</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.userFormWrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>Создание пользователя</h3>
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
                            >Добавить</Button>
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
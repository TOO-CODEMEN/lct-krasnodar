import { Button, CircularProgress, MenuItem, Modal } from '@mui/material'
import styles from './Users.module.scss'
import { useEffect, useState } from 'react'
import { useGetAllUsersQuery, useSaveUserMutation } from '../../../api/users'
import { User } from './User/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/adminSlice'
import { useForm } from 'react-hook-form'
import { UISelect } from '../../../Components/UISelect/UISelect'
import { positions } from '../../../data/positions'

export const Users = () => {
    const {
        register,
        handleSubmit,
        reset,
        control
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
        paddingY: 1,
        alignSelf: 'flex-start'
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveUserMutation] = useSaveUserMutation()
    const { isFetching, data, refetch } = useGetAllUsersQuery()
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)

    const onSubmit = async (data) => {
        await saveUserMutation({ ...data, startTime: Date.now() }).unwrap()
        refetch()
        setModalActive(false)
        reset()
    }

    useEffect(() => {
        data ? dispatch(setUsers(data)) : null
        refetch()
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
                        {console.log(data)}
                        {users.map((user) => (
                            <User user={user} key={user.id} />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}
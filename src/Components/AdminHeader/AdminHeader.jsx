import React from 'react'
import styles from './AdminHeader.module.scss'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { logOut } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'


export const AdminHeader = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    return (
        <div className={styles.Header}>
            <div className={styles.NavigationLeft}>
                <NavLink to='/users' className={styles.Link}>
                    Пользователи
                </NavLink>
                <NavLink to='/courses' className={styles.Link}>
                    Курсы
                </NavLink>
                <NavLink to='/materials' className={styles.Link}>
                    Материалы
                </NavLink>
                <NavLink to='/tasks' className={styles.Link}>
                    Задачи
                </NavLink>
            </div>
            <div className={styles.NavigationRight}>
                <NavLink to='/login' className={styles.Link}>
                    {currentUser.email}
                </NavLink>
                <Button onClick={() => dispatch(logOut())} sx={{ color: 'white' }}>
                    Выход
                </Button>
            </div>
        </div>
    )
}
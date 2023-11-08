import React from 'react'
import styles from './AdminHeader.module.scss'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userSlice'


export const AdminHeader = () => {
    const dispatch = useDispatch()

    const goToUser = () => {
        return
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__nav}>
                <NavLink to='/users' className={styles.header__nav__link}>
                    Пользователи
                </NavLink>
                <NavLink to='/materials' className={styles.header__nav__link}>
                    Материалы
                </NavLink>
                <Button onClick={() => dispatch(logOut())}>
                    Выход
                </Button>
            </div>
        </div>
    )
}
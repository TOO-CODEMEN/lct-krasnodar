import React from 'react'
import styles from './AdminHeader.module.scss'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userSlice'


export const AdminHeader = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.header}>
            <div className={styles.header__nav}>
                <div className={styles.navigation}>
                    <NavLink to='/users' className={styles.header__nav__link}>
                        Пользователи
                    </NavLink>
                    <NavLink to='/courses' className={styles.header__nav__link}>
                        Курсы
                    </NavLink>
                    <NavLink to='/materials' className={styles.header__nav__link}>
                        Материалы
                    </NavLink>
                    <NavLink to='/tasks' className={styles.header__nav__link}>
                        Задачи
                    </NavLink>
                </div>

                <Button onClick={() => dispatch(logOut())} sx={{color: 'white'}}>
                    Выход
                </Button>
            </div>
        </div>
    )
}
import React from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userSlice'


export const Header = () => {
    const dispatch = useDispatch()

    const goToUser = () => {
        return
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__nav}>
                <NavLink to='/main' className={({ isActive }) =>
                    isActive ? `${styles.header__nav__link} ${styles.active}` : styles.header__nav__link
                }>
                    Главная
                </NavLink>
                <NavLink to='/journal' className={({ isActive }) =>
                    isActive ? `${styles.header__nav__link} ${styles.active}` : styles.header__nav__link
                }>
                    Журнал
                </NavLink>
                <NavLink to='/plan' className={({ isActive }) =>
                    isActive ? `${styles.header__nav__link} ${styles.active}` : styles.header__nav__link
                }>
                    План
                </NavLink>
                <NavLink to='/lessons' className={({ isActive }) =>
                    isActive ? `${styles.header__nav__link} ${styles.active}` : styles.header__nav__link
                }>
                    Курс
                </NavLink>
                <NavLink to='/answers' className={({ isActive }) =>
                    isActive ? `${styles.header__nav__link} ${styles.active}` : styles.header__nav__link
                }>
                    Ответы на вопросы
                </NavLink>
            </div>

            <div className={styles.header__lk}>
                <NavLink onClick={() => goToUser()} className={styles.header__lk__link} to='/lk'>
                    <span>
                        {localStorage.getItem('email')}
                    </span>
                    <img src='https://fond-vsem-mirom.ru/wp-content/uploads/2022/05/img_2957.jpeg' />
                </NavLink>
                <Button onClick={() => dispatch(logOut())}  sx={{ ":hover": { color: '#f3234d' }, color: 'white'}}>Выход</Button>
            </div>
        </div>
    )
}
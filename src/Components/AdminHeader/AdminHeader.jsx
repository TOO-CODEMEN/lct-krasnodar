import React from 'react'
import styles from './AdminHeader.module.scss'
import { NavLink } from 'react-router-dom'


export const AdminHeader = () => {

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
                    Пользователи
                </NavLink>
            </div>
        </div>
    )
}
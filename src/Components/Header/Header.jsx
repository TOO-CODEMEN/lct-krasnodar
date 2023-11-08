import React from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'


export const Header = () => {

    const goToUser = () => {
        return
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__nav}>
                <NavLink to='/main' className={styles.header__nav__link}>
                    Главная
                </NavLink>
                <NavLink to='/journal' className={styles.header__nav__link}>
                    Журнал
                </NavLink>
                <NavLink to='/plan' className={styles.header__nav__link}>
                    План
                </NavLink>
                <NavLink to='/lessons' className={styles.header__nav__link}>
                    Курс
                </NavLink>
                <NavLink to='/answers' className={styles.header__nav__link}>
                    Ответы на вопросы
                </NavLink>
            </div>

            <div className={styles.header__lk}>
                <a onClick={() => goToUser()} className={styles.header__lk__link} href='#'>
                    <span>
                        Email
                    </span>
                    <img src='https://fond-vsem-mirom.ru/wp-content/uploads/2022/05/img_2957.jpeg'/>
                </a>
            </div>
        </div>
    )
}
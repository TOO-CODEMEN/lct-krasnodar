import React from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'


export const Header = () => {
    return (
        <div>
            <NavLink to='/main'>
                Главная
            </NavLink>
        </div>
    )
}
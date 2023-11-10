import React, {useState} from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { Badge, Button, Menu, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userSlice'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


export const Header = () => {
    const dispatch = useDispatch()

    const goToUser = () => {
        return
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
                <Badge badgeContent={0} color="error" sx={{ color: 'white', marginRight: 1, cursor: 'pointer' }} onClick={handleClick} >
                    <NotificationsNoneIcon />
                </Badge>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{display: 'block', paddingRight: 10}}
                >
                    <div>Уведомлений нет</div>
                </Menu>
                <NavLink onClick={() => goToUser()} className={styles.header__lk__link} to='/lk'>
                    <span>
                        {localStorage.getItem('email')}
                    </span>
                    <img src='https://fond-vsem-mirom.ru/wp-content/uploads/2022/05/img_2957.jpeg' />
                </NavLink>
                <Button onClick={() => dispatch(logOut())} sx={{ ":hover": { color: '#f3234d' }, color: 'white' }}>Выход</Button>
            </div>
        </div>
    )
}
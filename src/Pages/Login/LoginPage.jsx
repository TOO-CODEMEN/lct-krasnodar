import React, { useState } from 'react'
import styles from './Login.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLoginMutation } from '../../api/login';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { setUser } from '../../redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { startSession } from '../../session';

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, { isLoading, data }] = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmitHandler = async (e) => {

        if (!email || !password) {
            alert("Пожалуйста, введите почту и пароль!");
            return;
        } else if (!validator.isEmail(email)){
            alert('Почта введена неверно')
            return
        }
        e.preventDefault()
        try {
            await login({ email, password }).unwrap()
            location.reload()
        } catch(e) {
            alert('Неверный логин или пароль')
        }

    }

    if (data) {
        startSession(data)
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__title}>
                Вход
            </div>
            <form className={styles.login__form} onSubmit={onSubmitHandler}>
                <TextField
                    required
                    id="outlined"
                    label="Электронная почта"
                    type='email'
                    defaultValue={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{ width: '100%', marginBottom: 2 }}
                />
                <TextField
                    required
                    id="outlined-adornment-password"
                    label="Password"
                    type='password'
                    defaultValue={password}
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{ width: '100%', marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    type='submit'
                    sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', width: '25%', borderRadius: 2, paddingY: 1 }}
                    onClick={onSubmitHandler}
                    disabled={isLoading}
                >Вход</Button>

            </form>
        </div>
    )
}
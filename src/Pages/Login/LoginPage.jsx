import React, { useState } from 'react'

import styles from './Login.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__title}>
                Вход
            </div>
            <div className={styles.login__form}>
                <TextField
                    required
                    id="outlined"
                    label="Электронная почта"
                    type='email'
                    defaultValue={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={{width: '100%', marginBottom: 18, }}
                />
                <TextField
                    required
                    id="outlined-adornment-password"
                    label="Password"
                    type='password'
                    defaultValue={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{width: '100%', marginBottom: 18}}
                />

                <Button
                    variant="contained"
                    style={{width: '25%', borderRadius: 8, backgroundColor: '#E55C78' }}
                    onClick={(event) => onSubmitHandler(event)}
                >Вход</Button>
            </div>
        </div>
    )
}
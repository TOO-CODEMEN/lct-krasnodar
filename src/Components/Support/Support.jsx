import React from 'react'
import styles from './Support.module.scss'
import { Button, TextField } from '@mui/material'

export const Support = () => {
    return (
        <div className={styles.support}>
            <div className={styles.support__title}>
                Возникли вопросы?
            </div>

            <div className={styles.support__flex}>
                <div className={styles.support__flex__left}>
                    Связь с наставником
                </div>
                <div className={styles.support__flex__right}>
                    <div className={styles.support__flex__right__top}>
                        <TextField
                            required
                            style={{ marginRight: 30 }}
                            id="outlined"
                            label="Имя"
                            type='name'
                        />
                        <TextField />
                    </div>
                    <div className={styles.support__flex__right__bottom}>
                        <TextField style={{ width: '100%' }} />
                        <Button
                            variant="contained"
                            style={{ borderRadius: 8, backgroundColor: '#F1367D', display: 'block', marginTop: 22 }}
                            onClick={(event) => onSubmitHandler(event)}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
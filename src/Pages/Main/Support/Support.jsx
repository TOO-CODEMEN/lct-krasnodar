import React, { useState } from 'react'
import styles from './Support.module.scss'
import { Button, TextField } from '@mui/material'

export const Support = () => {
    const [question, setQuestion] = useState({
        name: '',
        department: '',
        desription: ''
    })
    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(question)
    }

    const changeState = (event, typeObject) => {
        setQuestion((value) => ({ ...value, [typeObject]: event.target.value }))
    }

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
                            type='text'
                            defaultValue={question.name}
                            onChange={(event) => changeState(event, 'name')}
                        />
                        <TextField
                            required
                            id="outlined"
                            label="Отдел"
                            type='text'
                            defaultValue={question.department}
                            onChange={(event) => changeState(event, 'department')}
                        />
                    </div>
                    <div className={styles.support__flex__right__bottom}>
                        <TextField
                            style={{ width: '100%' }}
                            type='text'
                            label='Вопрос'
                            multiline
                            minRows={5}
                            defaultValue={question.desription}
                            onChange={(event) => changeState(event, 'desription')}
                        />
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
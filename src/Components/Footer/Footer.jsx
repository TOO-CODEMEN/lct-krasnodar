import React from 'react'
import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <a href='https://proscom.ru' className={styles.footer__proscom}>PROSCOM ©2023</a>
            <div className={styles.footer__toocodemen}>made by TOO_CODEMEN</div>
            
        </div>
    )
}
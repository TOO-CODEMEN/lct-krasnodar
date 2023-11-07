import React, { useState } from 'react'
import styles from './News.module.scss'

export const News = (props) => {

    return (
        <div onClick={() => props.setActive(true)} className={styles.news}>
            <img src='https://alladvertising.ru/porridge/83/101/4086787e9a38b65ed92395fe7fb9b92b' />
            <div className={styles.news__hashtags}>
                {props.hashtags}
            </div>
            <div className={styles.news__title}>
                {props.title}
            </div>

            <div className={styles.news__desc}>
                {props.desc}
            </div>
        </div>
    )
}
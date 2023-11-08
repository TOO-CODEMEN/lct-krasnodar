import React from 'react'
import { News } from './News/News'
import styles from './Journal.module.scss'
import { useState } from 'react'
import { Modal } from '../../Components/Modal/Modal'

export const JournalPage = () => {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div className={styles.journal}>
            <News active={modalActive} setActive={setModalActive} title='Welcome to the Proscom' hashtags={'#новости'} desc={`В этом документе описано то, ради чего существует Proscom и какую ценность мы приносим миру. Это наш основной стержень, вокруг которого мы принимаем все наши стратегические и операционные решения. Мы живем со смыслом и создаем его.
И у нас есть ориентиры.`} />

            <Modal active={modalActive} setActive={setModalActive}>
                <div className={styles.journal__modal__title}>
                    Предназначение (Proscom Mission)
                </div>
                <p className={styles.journal__modal__desc}>
                    Мы создаем приносящие пользу инновационные цифровые сервисы с превосходным пользовательским взаимодействием, которые помогают визионерам, лидерам и первопроходцам формировать будущее нашего мира
                </p>

                <div className={styles.journal__modal__title}>
                    Ценности (Proscom Values)
                </div>
                <p className={styles.journal__modal__desc}>
                    У нас есть корпоративная культура. Да что там, у всех она есть, но мы ее еще и формализовали. Мы правда верим в то, что командной химии, которая дает колоссальную синергию, можно достичь только собрав рядом сильных неординарных личностей, которые понимают и чувствуют друг друга. А этого невозможно достичь без некого единого стержня (да-да, того самого, деревянного, который стоит у нас в переговорке).
                    Итак, встречайте, наши ценности.
                </p>

                <div className={styles.journal__modal__title}>
                    Амбиции (Proscom Vision)
                </div>
                <p className={styles.journal__modal__desc}>
                    Плох тот, который не мечтает стать трушным челиком.
                </p>

            </Modal>
        </div>
    )
}
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
                
            </Modal>
        </div>
    )
}
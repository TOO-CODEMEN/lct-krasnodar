import { Button, Modal, TextField } from '@mui/material'
import styles from './Materials.module.scss'
import { useState } from 'react'
import { Input } from '../../../Components/Input/Input'
import { useSaveMaterialMutation } from '../../../api/materials'

export const Materials = () => {
    const initialForm = {
        name: "",
        description: "",
        audience: "",
        link: "",
    }

    const [modalActive, setModalActive] = useState(false)
    const [saveMaterial] = useSaveMaterialMutation()
    const [form, setForm] = useState(initialForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await saveMaterial(form).unwrap()
        setModalActive(false)
        setForm(initialForm)
    }

    return (
        <div className='container'>
            <div className={styles.Materials}>
                <Button
                    variant="contained"
                    sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1 }}
                    onClick={() => setModalActive(true)}
                >Добавить материал</Button>
                <Modal open={modalActive} onClose={() => setModalActive(false)}>
                    <div className={styles.FormWrapper}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            required
                            label="Название материала"
                            value={form.name}
                            setValue={setForm}
                            object={form}
                            typeObject={'name'}
                        />
                        <Input
                            required
                            label="Описание"
                            value={form.description}
                            setValue={setForm}
                            object={form}
                            typeObject={'description'}
                        />
                        <Input
                            required
                            label="Для какой должности предназначен данный материал"
                            value={form.audience}
                            setValue={setForm}
                            object={form}
                            typeObject={'audience'}
                        />
                        <Input
                            required
                            label="Ссылка на материал"
                            value={form.link}
                            setValue={setForm}
                            object={form}
                            typeObject={'link'}
                        />
                        <Button
                            variant="contained"
                            sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', borderRadius: 2, paddingY: 1 }}
                            type='submit'
                        >Добавить</Button>
                    </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
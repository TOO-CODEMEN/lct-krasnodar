import { useDispatch, useSelector } from 'react-redux'
import styles from './Cabinet.module.scss'
import { Button } from '@mui/material';
import { logOut } from '../../redux/userSlice';
import { formatTimestamp } from '../../utils/formatTimestamp';

export const Cabinet = () => {

    const data = useSelector((state) => state.user.currentUser)

    const dispatch = useDispatch()

    return (
        <div className={styles.cabinet}>
            <div className={styles.cabinet__up}>
                <img src='https://fond-vsem-mirom.ru/wp-content/uploads/2022/05/img_2957.jpeg' alt="Фото пользователя" />
                <div className={styles.cabinet__up__info}>
                    <div className={styles.cabinet__up__info__name}>
                        {data.surname} {data.name} {data.patronymic}
                    </div>
                    <div className={styles.cabinet__up__info__email}>
                        {data.email}
                    </div>
                </div>
            </div>

            <div className={styles.cabinet__middle}>
                <div className={styles.cabinet__middle__date}>
                    Зарегистрирован с <span>{formatTimestamp(data.startTime)}</span>
                </div>
                <div className={styles.cabinet__middle__number}>
                    Номер телефона: <a href={`tel:${data.number}`}>{data.number}</a>
                </div>
                <div className={styles.cabinet__middle__vk}>
                    VK: <a href={`https://vk.com/${data.telegram}`}>{data.telegram}</a>
                </div>
            </div>

            <div className={styles.cabinet__bottom}>
                <div className={styles.cabinet__bottom__task}>
                    Выполнено задач: <div style={{ color: 'green' }}>{data.completedTasks + 2}</div>
                </div>

                <div className={styles.cabinet__bottom__task}>
                    Провалено: <div style={{ color: 'red' }}>{data.failedTasks + 1}</div>
                </div>
            </div>

            <Button
                variant='contained'
                sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', width: '10%', borderRadius: 2, paddingY: 1 }}
                onClick={() => dispatch(logOut())}
            >
                Выйти
            </Button>
        </div>
    )
}
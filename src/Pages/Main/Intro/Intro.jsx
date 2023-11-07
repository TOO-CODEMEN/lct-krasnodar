import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import styles from './Intro.module.scss'

const Intro = () => {
    return (
        <div className={styles.Intro}>
            <h1>Каждый день нужно стремиться открыть себя с новой стороны</h1>
            <p>Посмотрите, что подготовил Ваш наставник на сегодня:</p>
            <Button
                variant="contained"
                sx={{ ":hover": { backgroundColor: '#f3234d' }, backgroundColor: '#E55C78', width: '170px', borderRadius: 2, paddingY: 1 }}
                component={Link}
                to='/plan'
            >План на сегодня</Button>
        </div>
    )
}
export default Intro
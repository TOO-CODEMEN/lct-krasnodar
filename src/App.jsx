import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import Test from './Pages/Test/Test'
import { Plan } from './Pages/Plan/Plan'
import { Journal } from './Pages/Journal/Journal'
import { Missions } from './Pages/Missions/Missions'
import { Header } from './Components/Header/Header'

function App() {
	return (
		<BrowserRouter>
			<div className={styles.container}>
				<Header />
				<Routes>
					<Route path='/main' Component={Test} />
					<Route path='/journal' Component={Plan} />
					<Route path='/plan' Component={Journal} />
					<Route path='/missions' Component={Missions} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App

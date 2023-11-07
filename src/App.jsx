import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Plan } from './Pages/Plan/Plan'
import { Journal } from './Pages/Journal/Journal'
import { Missions } from './Pages/Missions/Missions'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
import { JournalPage } from './Pages/Journal/JournalPage'
import { PlanPage } from './Pages/Plan/PlanPage'
import { MissionsPage } from './Pages/Missions/MissionsPage'
import { LessonsPage } from './Pages/Lessons/LessonsPage'
import { AnswersPage } from './Pages/Answers/AnswersPage'
import { Chat } from './Components/Chat/Chat'
function App() {

	// if (!isLoggedIn()) {
	// 	return <Login />
	// }

	return (
		<BrowserRouter>
			<div className={styles.container}>
				<Header />
				<Routes>
					<Route path='/main' Component={Main} />
					<Route path='/journal' Component={JournalPage} />
					<Route path='/plan' Component={PlanPage} />
					<Route path='/missions' Component={MissionsPage} />
					<Route path='/lessons' Component={LessonsPage} />

					<Route path='*' element={<Navigate to='/main' />} />
				</Routes>
				<Chat />
			</div>
		</BrowserRouter>
	)
}

export default App

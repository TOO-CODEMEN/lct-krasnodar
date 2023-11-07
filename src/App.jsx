import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
import { JournalPage } from './Pages/Journal/JournalPage'
import { PlanPage } from './Pages/Plan/PlanPage'
import { MissionsPage } from './Pages/Missions/MissionsPage'
import { LessonsPage } from './Pages/Lessons/LessonsPage'
import { AnswersPage } from './Pages/Answers/AnswersPage'
function App() {

	// if (!isLoggedIn()) {
	// 	return <Login />
	// }

	return (
		<BrowserRouter>
			<div>
				<Header />
				<Routes>
					<Route path='/main' Component={Main} />
					<Route path='/journal' Component={JournalPage} />
					<Route path='/plan' Component={PlanPage} />
					<Route path='/missions' Component={MissionsPage} />
					<Route path='/lessons' Component={LessonsPage} />
					<Route path='/answers' Component={AnswersPage} />
					<Route path='*' element={<Navigate to='/main' />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App

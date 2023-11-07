import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
import { JournalPage } from './Pages/Journal/JournalPage'
import { PlanPage } from './Pages/Plan/PlanPage'
import { LessonsPage } from './Pages/Lessons/LessonsPage'
import { AnswersPage } from './Pages/Answers/AnswersPage'
import { Footer } from './Components/Footer/Footer'

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
					<Route path='/lessons' Component={LessonsPage} />
					<Route path='/answers' Component={AnswersPage} />
					<Route path='*' element={<Navigate to='/main' />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App

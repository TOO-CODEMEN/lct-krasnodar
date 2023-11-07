import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
import { PlanPage } from './Pages/Plan/PlanPage'
import { MissionsPage } from './Pages/Missions/MissionsPage'
import { LessonsPage } from './Pages/Lessons/LessonsPage'
import { AnswersPage } from './Pages/Answers/AnswersPage'
import { Footer } from './Components/Footer/Footer'
import { AdminPanel } from './Pages/AdminPanel/AdminPanel'
import { AdminHeader } from './Components/AdminHeader/AdminHeader'
import { Users } from './Pages/AdminPanel/Users/Users'
import { LoginPage } from './Pages/Login/LoginPage'

function App() {

	if (!isLoggedIn()) {
		return <LoginPage />
	}

	return (
		<BrowserRouter>
			<div>
				<Header />
                <AdminHeader/>
				<Routes>
					<Route path='/main' Component={Main} />
					<Route path='/admin' Component={AdminPanel} />
					<Route path='/users' Component={Users} />
					<Route path='/plan' Component={PlanPage} />
					<Route path='/missions' Component={MissionsPage} />
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

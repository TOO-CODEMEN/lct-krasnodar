import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
import { JournalPage } from './Pages/Journal/JournalPage'
import { PlanPage } from './Pages/Plan/PlanPage'
import { LessonsPage } from './Pages/Lessons/LessonsPage'
import { AnswersPage } from './Pages/Answers/AnswersPage'
import { Footer } from './Components/Footer/Footer'
import { AdminPanel } from './Pages/AdminPanel/AdminPanel'
import { AdminHeader } from './Components/AdminHeader/AdminHeader'
import { Users } from './Pages/AdminPanel/Users/Users'
import { LoginPage } from './Pages/Login/LoginPage'
import { JournalPage } from './Pages/Journal/JournalPage'
import { Materials } from './Pages/AdminPanel/Materials/Materials'
import { useGetUserQuery } from './api/users'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/userSlice'

function App() {
    const { data } = useGetUserQuery(localStorage.getItem('email'))
    const dispatch = useDispatch()

    // if (!isLoggedIn()) {
    //     return <Navigate to="/login" />
    // }

    if (data) {
        dispatch(setUser(data))
    }

    return (
        <BrowserRouter>
            {isLoggedIn() ? (
                <>
                    <Header />
                    <Routes>
                        <Route path='/main' Component={Main} />
                        <Route path='/admin' Component={AdminPanel} />
                        <Route path='/users' Component={Users} />
                        <Route path='/materials' Component={Materials} />
                        <Route path='/plan' Component={PlanPage} />
                        <Route path='/journal' Component={JournalPage} />
                        <Route path='/lessons' Component={LessonsPage} />
                        <Route path='/answers' Component={AnswersPage} />
                        <Route path='*' element={<Navigate to='/main' />} />
                    </Routes>
                    <Footer />
                </>
            ) : (
                <Routes>
                    <Route path='/login' Component={LoginPage} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </Routes>

            )}

        </BrowserRouter>
    )
}

export default App

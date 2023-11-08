import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Header } from './Components/Header/Header'
import { isLoggedIn } from './session'
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
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/userSlice'
import { useEffect } from 'react'


function App() {
    const email = localStorage.getItem('email')
    const { data } = email ? useGetUserQuery(email) : false
    const dispatch = useDispatch()
    const role = useSelector((state) => state.user.currentUser.role)

    if (!isLoggedIn()) {
        return <LoginPage />
    }

    useEffect(() => {
        if (data) {
            dispatch(setUser(data))
            if (role === "USER") {
                VK.Widgets.CommunityMessages("vk_community_messages", 223332793, { tooltipButtonText: "Есть вопрос?" })
            }
        }
    }, [data, role])


    return (
        <>
            {role === 'ADMIN' ? <BrowserRouter>
                <AdminHeader />
                <Routes>
                    <Route path='/admin' Component={AdminPanel} />
                    <Route path='/materials' Component={Materials} />
                    <Route path='/users' Component={Users} />
                    <Route path='*' element={<Navigate to='/admin' />} />
                </Routes>
                <Footer />
            </BrowserRouter> :
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/main' Component={Main} />
                        <Route path='/plan' Component={PlanPage} />
                        <Route path='/journal' Component={JournalPage} />
                        <Route path='/lessons' Component={LessonsPage} />
                        <Route path='/answers' Component={AnswersPage} />
                        <Route path='*' element={<Navigate to='/main' />} />
                    </Routes>
                    <div id="vk_community_messages"></div>
                    <Footer />
                </BrowserRouter>
            }
        </>
    )
}

export default App

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
import { Cabinet } from './Pages/Cabinet/CabinetPage'
import { Tasks } from './Pages/AdminPanel/Tasks/Tasks'
import { Courses } from './Pages/AdminPanel/Courses/Courses'
import { useGetCuratorQuery } from './api/curator'


function App() {
    const dispatch = useDispatch()
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')
    const { data: curatorData, isError: curatorError } = useGetCuratorQuery(email)
    const { data: userData, isError: userError } = useGetUserQuery(email)
    useEffect(() => {
        if (curatorData || userData) {
            if (role === "ROLE_USER") {
                VK.Widgets.CommunityMessages("vk_community_messages", userData.curator.vkGroupId, { tooltipButtonText: "Есть вопрос?" })
                dispatch(setUser(userData))
            }
            if (role === "ROLE_ADMIN") {
                dispatch(setUser(curatorData))
            }
        } else if (curatorError || userError) {
            localStorage.clear()
        }
    }, [curatorData, userData, role])


    return (
        <>
            {!isLoggedIn() ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage onLogin={() => location.reload()} />} />
                        <Route path='*' element={<Navigate to='/login' />} />
                    </Routes>
                </BrowserRouter>
            ) : role === 'ROLE_ADMIN' ? (
                <BrowserRouter>
                    <AdminHeader />
                    <Routes>
                        <Route path='/admin' Component={AdminPanel} />
                        <Route path='/courses' Component={Courses} />
                        <Route path='/tasks' Component={Tasks} />
                        <Route path='/materials' Component={Materials} />
                        <Route path='/users' Component={Users} />
                        <Route path='*' element={<Navigate to='/admin' />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            ) : role === 'ROLE_USER' ?
                (
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route path='/main' Component={Main} />
                            <Route path='/plan' Component={PlanPage} />
                            <Route path='/journal' Component={JournalPage} />
                            <Route path='/lessons' Component={LessonsPage} />
                            <Route path='/answers' Component={AnswersPage} />
                            <Route path='/lk' Component={Cabinet} />
                            <Route path='*' element={<Navigate to='/main' />} />
                        </Routes>
                        <div id="vk_community_messages"></div>
                        <Footer />
                    </BrowserRouter>
                ) : null}
        </>
    )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { Plan } from './Pages/Plan/Plan'
import { Journal } from './Pages/Journal/Journal'
import { Missions } from './Pages/Missions/Missions'
import { Header } from './Components/Header/Header'
import { Lessons } from './Pages/Lessons/Lessons'
import { isLoggedIn } from './session'
import { Login } from './Pages/Login/Login'


function App() {

    if (isLoggedIn()) {
        return <Login />
    }

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path='/main' Component={Main} />
                    <Route path='/journal' Component={Journal} />
                    <Route path='/plan' Component={Plan} />
                    <Route path='/missions' Component={Missions} />
                    <Route path='/lessons' Component={Lessons} />

                    <Route path='*' element={<Navigate to='/main' />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

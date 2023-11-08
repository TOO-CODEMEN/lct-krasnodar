import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: {},
    isAuth: false
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload
            state.isAuth = true
        },
        logOut(state) {
            localStorage.clear( )
            state.currentUser = {}
            state.isAuth = false
        }
    },
})

export const { setUser, logOut } = usersSlice.actions

export default usersSlice.reducer
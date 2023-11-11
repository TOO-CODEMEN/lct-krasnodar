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
        updateAdmin(state, action) {
            state.currentUser.vkGroupId = action.payload.vkGroupId
        },
        logOut(state) {
            localStorage.clear( )
            state.currentUser = {}
            state.isAuth = false
            location.reload()
        }
    },
})

export const { setUser, logOut, updateAdmin } = usersSlice.actions

export default usersSlice.reducer
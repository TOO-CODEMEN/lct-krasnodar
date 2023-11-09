import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        updateUser(state, action) {
            const index = state.users.findIndex(user => user.id == action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        deleteUser(state, action) {
            state.users = state.users.filter((user) => user.id != action.payload)
        }
    },
})

export const { setUsers, deleteUser, updateUser } = adminSlice.actions

export default adminSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tasksApi } from '../api/tasks'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, tasksApi.middleware),
})

setupListeners(store.dispatch)
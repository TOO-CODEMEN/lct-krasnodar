import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tasksApi } from '../api/tasks'
import { materialsApi } from '../api/materials'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, tasksApi.middleware, materialsApi.middleware),
})

setupListeners(store.dispatch)
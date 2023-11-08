import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginApi } from '../api/login'
import { tasksApi } from '../api/tasks'
import { materialsApi } from '../api/materials'
import { lessonApi } from '../api/lessons'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
        [lessonApi.reducerPath]: lessonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, loginApi.middleware, tasksApi.middleware, materialsApi.middleware, lessonApi.middleware),
})

setupListeners(store.dispatch)
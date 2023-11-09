import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginApi } from '../api/login'
import { tasksApi } from '../api/tasks'
import { materialsApi } from '../api/materials'
import { lessonApi } from '../api/lessons'

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
        [lessonApi.reducerPath]: lessonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware, usersApi.middleware, tasksApi.middleware, materialsApi.middleware, lessonApi.middleware),
})

setupListeners(store.dispatch)
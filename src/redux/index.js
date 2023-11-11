import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginApi } from '../api/login'
import { tasksApi } from '../api/tasks'
import { materialsApi } from '../api/materials'
import { coursesApi } from '../api/courses'
import { curatorApi } from '../api/curator'

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [curatorApi.reducerPath]: curatorApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware,
                                                                        usersApi.middleware,
                                                                        tasksApi.middleware,
                                                                        materialsApi.middleware,
                                                                        coursesApi.middleware,
                                                                        curatorApi.middleware),
})

setupListeners(store.dispatch)
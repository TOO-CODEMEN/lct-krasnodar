import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import { usersApi } from '../api/users'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginApi } from '../api/login'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, loginApi.middleware),
})

setupListeners(store.dispatch)
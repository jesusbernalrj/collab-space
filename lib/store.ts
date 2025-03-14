import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./feautures/auth/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers here as your app grows
    },
    devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


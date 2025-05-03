import { configureStore } from "@reduxjs/toolkit";
import pomoReducer from '../features/pomodoro/pomodoroSlice'
import authReducer from '../features/auth/AuthSlice'
import todoReducer from '../features/todo/TodoSlice'

const store = configureStore({
    reducer:{
        pomo : pomoReducer,
        auth : authReducer,
        todo : todoReducer,
    }
})

export default store;
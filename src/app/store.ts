import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/Todolists/model/tasks-Slice.ts"
import { appReducer, appSlice } from "@/app/app-Slice.ts"
import { todolistsSlice, todolistsReducer } from "@/features/Todolists/model/todolists-Slice.ts"
import { authReducer, authSlice } from "@/features/auth/model/auth.slice.ts"

// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer,
//     app: appReducer,
// })

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistsSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store

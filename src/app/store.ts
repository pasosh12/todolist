import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/Todolists/model/tasks-reducer.ts"
import { appReducer, appSlice } from "@/app/app-reducer.ts"
import { todolistsSlice, todolistsReducer } from "@/features/Todolists/model/todolists-reducer.ts"

// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer,
//     app: appReducer,
// })

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistsSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
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

import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {tasksSliceReducer, tasksSlice} from "../features/Todolists/model/tasks-reducer.ts";
// import {todolistsReducer} from "../features/Todolists/model/todolists-reducer.ts";
import {appReducer} from "@/app/app-reducer.ts";
import {todolistsSlice, todolistsSliceReducer} from "@/features/Todolists/model/todolists-reducer.ts";

// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer,
//     app: appReducer,
// })

const rootReducer = combineReducers({
    [tasksSlice.name]: tasksSliceReducer,
    [todolistsSlice.name]: todolistsSliceReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store;
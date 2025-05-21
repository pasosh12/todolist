import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/Todolists/model/tasks-Slice.ts"
import { appReducer, appSlice } from "@/app/app-Slice.ts"
import { authReducer, authSlice } from "@/features/auth/model/auth.slice.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { todolistsReducer, todolistsSlice } from "@/features/Todolists/model/todolists-Slice.ts"
import { baseApi } from "@/app/baseApi.ts"

// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer,
//     app: appReducer,
// })

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)
// export const store = configureStore({
// reducer: rootReducer,
// })

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store

import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"
import { todolistsApi } from "@/features/Todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/Todolists/api/tasksApi.ts"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    paletteMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
})
export const appReducer = appSlice.reducer
export const { selectTheme, selectStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { setAppStatusAC, changeThemeModeAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export type ThemeMode = "light" | "dark"

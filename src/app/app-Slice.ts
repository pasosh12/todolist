import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

const initialState = {
  themeMode: "dark" as ThemeMode,
  paletteMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
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
  }),
})
export const appReducer = appSlice.reducer
export const { selectTheme, selectStatus, selectAppError } = appSlice.selectors
export const { setAppStatusAC, changeThemeModeAC, setAppErrorAC } = appSlice.actions
export type ThemeMode = "light" | "dark"

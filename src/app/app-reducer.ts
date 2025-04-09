import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
  paletteMode: "dark" as ThemeMode,
  status: "idle" as StatusType,
}

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  },
  reducers: (create) => ({
    changeStatusAC: create.reducer<{ status: StatusType }>((state, action) => {
      state.status = action.payload.status
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})
export const appReducer = appSlice.reducer
export const { selectTheme, selectStatus } = appSlice.selectors
export const { changeStatusAC, changeThemeModeAC } = appSlice.actions
export type ThemeMode = "light" | "dark"
export type StatusType = "idle" | "loading" | "completed"

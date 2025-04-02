import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
  paletteMode: "dark" as ThemeMode,
}
export const changeThemeModeAC = createAction<{
  themeMode: "dark" | "light"
}>("app/changeThemeMode")

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode
  })
})

export type ThemeMode = "light" | "dark"

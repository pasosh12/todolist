import { RootState } from "@/app/store.ts"

export const selectThemeMode = (state: RootState) => state.app.themeMode

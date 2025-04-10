import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "@/app/app-Slice.ts"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#dede29",
        dark: "#62621a",
      },
    },
  })
}

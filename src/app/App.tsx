import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Header } from "@/common/components"
import { Menu } from "./Menu.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { selectTheme } from "@/app/app-Slice.ts"
import { Routing } from "@/common/routing"

export type FilterValuesType = "all" | "active" | "completed"

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export const App = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <Menu />
      </ThemeProvider>
    </div>
  )
}

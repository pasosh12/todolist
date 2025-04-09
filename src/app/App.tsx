import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Header } from "@/common/components"
import { Menu } from "./Menu.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types.ts"
import { selectTheme } from "@/app/app-reducer.ts"

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
export type TasksState = {
  [todolistID: string]: DomainTask[]
}

export const App = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Menu />
      </ThemeProvider>
    </div>
  )
}

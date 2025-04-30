import styles from "./App.module.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { selectTheme } from "@/app/app-Slice.ts"
import { Routing } from "@/common/routing"
import { useAppDispatch } from "@/common/hooks"
import { useEffect, useState } from "react"
import { initializeAppTC } from "@/features/auth/model/auth.slice.ts"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export const App = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => setIsInitialized(true))
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

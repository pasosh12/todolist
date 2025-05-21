import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { containerSx } from "@/TodolistItem.styles.ts"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components"
import { changeThemeModeAC, selectStatus, selectTheme } from "@/app/app-Slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { logoutTC, selectIsLoggedIn } from "@/features/auth/model/auth.slice.ts"

export const Header = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)
  const loadingStatus = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const logoutHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box sx={containerSx}>
            <Switch checked={themeMode === "dark"} onChange={changeThemeMode} />
            {isLoggedIn && (
              <NavButton onClick={logoutHandler} color="inherit">
                Sign out
              </NavButton>
            )}
            <NavButton background={theme.palette.primary.dark} color="inherit">
              Faq
            </NavButton>
          </Box>
        </Container>
      </Toolbar>
      {loadingStatus === "loading" && <LinearProgress color="inherit" />}
    </AppBar>
  )
}

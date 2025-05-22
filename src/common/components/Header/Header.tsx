import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components"
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectTheme, setIsLoggedInAC } from "@/app/app-Slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { authApi, useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { containerSx } from "@/common/styles"

export const Header = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)
  const loadingStatus = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        // dispatch(baseApi.util.resetApiState())
        dispatch(authApi.util.invalidateTags(["Todolist", "Tasks"]))
      })
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

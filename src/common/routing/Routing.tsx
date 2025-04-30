import { PageNotFound } from "@/common/components"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectIsLoggedIn } from "@/features/auth/model/auth.slice.ts"
import { Route, Routes } from "react-router"
import { Login } from "@/features/auth/ui/Login.tsx"
import { Menu } from "@/app/Menu.tsx"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isloggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route path={Path.Main} element={<Menu />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

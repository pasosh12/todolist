import { PageNotFound } from "@/common/components"
import { Route, Routes } from "react-router"
import { Login } from "@/features/auth/ui/Login.tsx"
import { Menu } from "@/app/Menu.tsx"
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth.slice.ts"

export const Path = {
  Main: "/",
  Login: "login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Menu />} />
        <Route path={Path.Faq} element={<h2>Faq</h2>} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

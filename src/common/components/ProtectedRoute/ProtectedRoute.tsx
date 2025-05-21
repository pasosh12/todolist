import { PropsWithChildren, ReactNode } from "react"
import { Navigate, Outlet } from "react-router"
import { Path } from "@/common/routing"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: PropsWithChildren<Props>) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}

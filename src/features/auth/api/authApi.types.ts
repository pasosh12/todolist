import { LoginInputs } from "@/features/auth/lib/schemas"

export type LoginArgs = LoginInputs & {
  captcha?: string
}
export type MeResponse = {
  id: number
  email: string
  login: string
}

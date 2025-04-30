import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { MeResponse } from "@/features/auth/api/authApi.types.ts"
import type { LoginInputs } from "@/features/auth/lib/schemas"

export const authApi = {
  login(args: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", args)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>("/auth/me")
  },
  security() {
    return instance.get<{ url: string }>("/security/get-captcha-url")
  },
}

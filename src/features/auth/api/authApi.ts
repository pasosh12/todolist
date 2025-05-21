import type { BaseResponse } from "@/common/types"
import type { LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),
    security: build.query<{ url: string }, void>({
      query: () => `security/get-captcha-url`,
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useSecurityQuery } = authApi

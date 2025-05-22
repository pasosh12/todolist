import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"
import { setAppErrorAC } from "@/app/app-Slice.ts"
import { ResultCode } from "@/common/enums"
import { isErrorWithMessage } from "@/common/utils/isErrorWithMessage.ts"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Something went wrong"
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error
        break
      case 403: {
        error = "403 Forbidden, check API"
        break
      }
      case 404:
      case 500: {
        if (isErrorWithMessage(result.error.data)) {
          error = "404 Forbidden, check API"
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      }
      default: {
        error = JSON.stringify(result.error)
        break
      }
    }
    api.dispatch(setAppErrorAC({ error }))
  }
  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}

// import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"

import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
        method: "POST",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
        method: "PUT",
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
})
export const { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation, useCreateTaskMutation } = tasksApi

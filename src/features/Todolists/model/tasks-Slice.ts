// import { createTodolistTC, deleteTodolistTC } from "@/features/Todolists/model/todolists-Slice.ts"
// import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
// import { _tasksApi } from "@/features/Todolists/api/tasksApi.ts"
// import { setAppStatusAC } from "@/app/app-Slice.ts"
// import { DomainTask, DomainTaskSchema, UpdateTaskModel } from "@/features/Todolists/api/tasksApi.types.ts"
// import { RootState } from "@/app/store.ts"
// import { ResultCode } from "@/common/enums"
// import { clearData } from "@/common/actions/common.actions.ts"
//
// const initialState: TasksState = {}
//
// export const tasksSlice = createAppSlice({
//   name: "tasks",
//   initialState: initialState, //{} as TasksState
//   selectors: {
//     selectTasks: (state) => state,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createTodolistTC.fulfilled, (state, action) => {
//         state[action.payload.todolist.id] = []
//       })
//       .addCase(deleteTodolistTC.fulfilled, (state, action) => {
//         delete state[action.payload.id]
//       })
//       .addCase(clearData.type, () => {
//         return {}
//       })
//   },
//   reducers: (create) => ({
//     // fetchTasksData: create.asyncThunk(
//     //   async (arg: { todolistId: string }, { rejectWithValue, dispatch }) => {
//     //     try {
//     //       dispatch(setAppStatusAC({ status: "loading" }))
//     //       const res = await _tasksApi.getTasks(arg.todolistId)
//     //       const tasks = DomainTaskSchema.array().parse(res.data.items)
//     //       dispatch(setAppStatusAC({ status: "succeeded" }))
//     //       return { tasks, todolistId: arg.todolistId }
//     //     } catch (error: any) {
//     //       handleServerNetworkError(error, dispatch)
//     //       return rejectWithValue(null)
//     //     }
//     //   },
//     //   {
//     //     fulfilled: (state, action) => {
//     //       state[action.payload.todolistId] = action.payload.tasks
//     //     },
//     //   },
//     // ),
//     // updateTasksDataTC: create.asyncThunk(
//     //   async (
//     //     payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
//     //     { dispatch, getState, rejectWithValue },
//     //   ) => {
//     //     const { todolistId, taskId, domainModel } = payload
//     //
//     //     const allTodolistTasks = (getState() as RootState).tasks[todolistId]
//     //     const task = allTodolistTasks.find((task) => task.id === taskId)
//     //
//     //     if (!task) {
//     //       return rejectWithValue(null)
//     //     }
//     //
//     //     const model: UpdateTaskModel = {
//     //       description: task.description,
//     //       title: task.title,
//     //       priority: task.priority,
//     //       startDate: task.startDate,
//     //       deadline: task.deadline,
//     //       status: task.status,
//     //       ...domainModel,
//     //     }
//     //     try {
//     //       dispatch(setAppStatusAC({ status: "loading" }))
//     //       const res = await _tasksApi.updateTask({ todolistId, taskId, model })
//     //       if (res.data.resultCode === ResultCode.Success) {
//     //         dispatch(setAppStatusAC({ status: "succeeded" }))
//     //         return { task: res.data.data.item }
//     //       } else {
//     //         handleServerAppError(res.data, dispatch)
//     //         return rejectWithValue(null)
//     //       }
//     //     } catch (error) {
//     //       handleServerNetworkError(dispatch, error)
//     //       return rejectWithValue(null)
//     //     }
//     //   },
//     //   {
//     //     fulfilled: (state, action) => {
//     //       const allTodolistTasks = state[action.payload.task.todoListId]
//     //       const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id)
//     //       if (taskIndex !== -1) {
//     //         allTodolistTasks[taskIndex] = action.payload.task
//     //       }
//     //     },
//     //   },
//     // ),
//     // deleteTaskTC: create.asyncThunk(
//     //   async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
//     //     try {
//     //       await _tasksApi.deleteTask(payload)
//     //       return payload
//     //     } catch (error) {
//     //       return thunkAPI.rejectWithValue(null)
//     //     }
//     //   },
//     //   {
//     //     fulfilled: (state, action) => {
//     //       const tasks = state[action.payload.todolistId]
//     //       const index = tasks.findIndex((task) => task.id === action.payload.taskId)
//     //       if (index !== -1) {
//     //         tasks.splice(index, 1)
//     //       }
//     //     },
//     //   },
//     // ),
//     // createTaskTC: create.asyncThunk(
//     //   async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
//     //     try {
//     //       dispatch(setAppStatusAC({ status: "loading" }))
//     //       const res = await _tasksApi.createTask(payload)
//     //       if (res.data.resultCode === ResultCode.Success) {
//     //         dispatch(setAppStatusAC({ status: "succeeded" }))
//     //         return { task: res.data.data.item }
//     //       } else {
//     //         handleServerAppError(res.data, dispatch)
//     //         return rejectWithValue(null)
//     //       }
//     //     } catch (error) {
//     //       handleServerNetworkError(dispatch, error)
//     //       return rejectWithValue(null)
//     //     }
//     //   },
//     //   {
//     //     fulfilled: (state, action) => {
//     //       state[action.payload.task.todoListId].unshift(action.payload.task)
//     //     },
//     //   },
//     // ),
//   }),
// })
// export type TasksState = Record<string, DomainTask[]>
//
// export const { selectTasks } = tasksSlice.selectors
// export const tasksReducer = tasksSlice.reducer
// export const { fetchTasksData, deleteTaskTC, updateTasksDataTC, createTaskTC } = tasksSlice.actions

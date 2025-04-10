import { TasksState } from "@/app/App.tsx"
import { createTodolistTC, deleteTodolistTC } from "@/features/Todolists/model/todolists-Slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/Todolists/api/tasksApi.ts"
import { changeStatusAC } from "@/app/app-Slice.ts"
import { UpdateTaskModel } from "@/features/Todolists/api/tasksApi.types.ts"

const initialState: TasksState = {}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: initialState, //{} as TasksState
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
  reducers: (create) => ({
    fetchTasksData: create.asyncThunk(
      async (arg: { todolistId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(arg.todolistId)
          dispatch(changeStatusAC({ status: "completed" }))
          return { tasks: res.data.items, todolistId: arg.todolistId }
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    updateTasksData: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; model: UpdateTaskModel }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ ...args })
          dispatch(changeStatusAC({ status: "completed" }))

          return { task: res.data.data.item, todolistId: args.todolistId, taskId: args.taskId }
          // }
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, taskId, task } = action.payload
          const tasks = state[todolistId]

          if (tasks) {
            const targetTask = tasks.find((t) => t.id === taskId)
            if (targetTask) {
              Object.assign(targetTask, task) // Мутабельно обновляем свойства задачи
            }
          }
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload)
          return payload
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),

    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.createTask(args)
          dispatch(changeStatusAC({ status: "completed" }))
          return { task: res.data.data.item }
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer
export const { fetchTasksData, deleteTask, updateTasksData, createTask } = tasksSlice.actions

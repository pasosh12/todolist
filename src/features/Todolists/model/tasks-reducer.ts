import { TasksState } from "@/app/App.tsx"
import { createTodolistTC, deleteTodolistTC } from "@/features/Todolists/model/todolists-reducer.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/Todolists/api/tasksApi.ts"
import { TaskStatus } from "@/common/enums"
import { changeStatusAC } from "@/app/app-reducer.ts"

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
          console.log(arg.todolistId)
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
    changeTaskStatusAC: create.reducer<{
      todolistId: string
      taskId: string
      newStatus: TaskStatus
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.newStatus
      }
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      newTitle: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.newTitle
      }
    }),

    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const taskIndex = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
      if (taskIndex !== -1) {
        state[action.payload.todolistId].splice(taskIndex, 1)
      }
    }),

    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(args)
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
export const { fetchTasksData, deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, createTask } = tasksSlice.actions

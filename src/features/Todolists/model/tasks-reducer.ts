import { TasksState, TaskType } from "@/app/App.tsx"
import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "@/features/Todolists/model/todolists-reducer.ts"

const initialState: TasksState = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
  reducers: (create) => {
    return {
      changeTaskStatusAC: create.reducer<{
        todolistId: string
        taskId: string
        newStatus: boolean
      }>((state, action) => {
        const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (task) {
          task.isDone = action.payload.newStatus
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

      createTaskAC: create.preparedReducer(
        (title: string, todolistId: string) => ({
          payload: {
            todolistId,
            id: nanoid(),
            title,
          },
        }),
        (state, action) => {
          if (!state[action.payload.todolistId]) {
            state[action.payload.todolistId] = []
          }
          const newTask: TaskType = { id: action.payload.id, title: action.payload.title, isDone: false }
          state[action.payload.todolistId].unshift(newTask)
        },
      ),
    }
  },
})

export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer
export const { deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, createTaskAC } = tasksSlice.actions

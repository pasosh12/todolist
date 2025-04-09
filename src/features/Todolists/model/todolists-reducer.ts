import { FilterValuesType, TodolistType } from "@/app/App.tsx"

import { nanoid } from "@reduxjs/toolkit"
import { todolistsApi } from "@/features/Todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"

const initialState: TodolistType[] = []

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: initialState,
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{
        todolistId: string
        newFilter: FilterValuesType
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].filter = action.payload.newFilter
        }
      }),
      createTodolistAC: create.preparedReducer(
        (title: string) => ({
          payload: {
            id: nanoid(),
            title,
          },
        }),
        (state, action) => {
          state.unshift({ ...action.payload, filter: "all" })
        },
      ),
      deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),
      fetchTodolistsTC: create.asyncThunk(
        async (_args, { rejectWithValue }) => {
          try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
          } catch (err) {
            return rejectWithValue(err)
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
          },
          pending: () => {
            console.log("hello pending")
          },
        },
      ),
      deleteTodolistsTC: create.asyncThunk(
        async (args: { todolistId: string }, { rejectWithValue }) => {
          try {
            await todolistsApi.deleteTodolist(args.todolistId)
            return args
          } catch (err) {
            return rejectWithValue(err)
          }
        },
        {
          fulfilled: (state, action) => {
            return state.filter((tl) => tl.id !== action.payload.todolistId)
          },
        },
      ),
      changeTodolistTitleTC: create.asyncThunk(
        async (
          args: {
            todolistId: string
            title: string
          },
          { rejectWithValue },
        ) => {
          try {
            await todolistsApi.changeTodolistTitle(args)
            return args
          } catch (err) {
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (arg: { title: string }, thunkAPI) => {
          try {
            const res = await todolistsApi.createTodolist(arg.title)
            return { todolist: res.data.data.item }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all" })
          },
        },
      ),
    }
  },
})

export const { selectTodolists } = todolistsSlice.selectors
export const {
  fetchTodolistsTC,
  changeTodolistTitleAC,
  createTodolistTC,
  changeTodolistTitleTC,
  createTodolistAC,
  deleteTodolistAC,
  deleteTodolistsTC,
  changeTodolistFilterAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

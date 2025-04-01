import {FilterValuesType, TodolistType} from '@/app/App.tsx'

import {
    createAsyncThunk,
    // createAction, createReducer,
    createSlice, nanoid
} from "@reduxjs/toolkit";
import {todolistsApi} from "@/features/Todolists/api/todolistsApi.ts";

const initialState: TodolistType[] = []

// export const deleteTodolistAC = createAction<{
//         todolistId: string }>('todolist/delete_todolist')
//
// export const createTodolistAC = createAction('todolist/createTodolist', (title: string) => {
//     return {payload: {id: nanoid(), title}}
// })
//
// export const changeTodolistTitleAC = createAction<{
//     todolistId: string,
//     newTitle: string
// }>('todolist/changeTodolistTitle')
//
// export const changeTodolistFilterAC = createAction<{
//     todolistId: string,
//     newFilter: FilterValuesType
// }>('todolist/changeTodolistFilter')
//
//
// export const todolistsReducer = createReducer(initialState, (builder) => {
//     builder.addCase(deleteTodolistAC, (state, action) => {
//         const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
//         if (index !== -1) {
//             state.splice(index, 1)
//         }
//     }).addCase(createTodolistAC, (state, action) => {
//         state.push({...action.payload, filter: 'all'})
//     }).addCase(changeTodolistTitleAC, (state, action) => {
//         const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
//         if (todolist) {
//             todolist.title = action.payload.newTitle
//         }
//     }).addCase(changeTodolistFilterAC, (state, action) => {
//         const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
//         if (index !== -1) {
//             state[index].filter = action.payload.newFilter
//         }
//     })
// })

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: (create) => {
        return {
            deleteTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            changeTodolistTitleAC: create.reducer<{ todolistId: string, newTitle: string }>((state, action) => {
                const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
                if (todolist) {
                    todolist.title = action.payload.newTitle
                }
            }),
            changeTodolistFilterAC: create.reducer<{
                todolistId: string,
                newFilter: FilterValuesType
            }>((state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
                if (index !== -1) {
                    state[index].filter = action.payload.newFilter
                }
            }),
            createTodolistAC: create.preparedReducer((title: string) => ({
                    payload: {
                        id: nanoid(),
                        title
                    }
                }),
                (state, action) => {
                    state.unshift({...action.payload, filter: 'all'})
                }
            )
        }
    },
    selectors: {
        selectTodolists: (state => state)
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        })
        builder.addCase(deleteTodolistsTC.fulfilled, (state, action) => {
            return state.filter(tl=>tl.id!==action.payload.todolistId)
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
    }
})
export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleAC`,
    async (args: { id: string; title: string }, { rejectWithValue }) => {
        try {
            await todolistsApi.changeTodolistTitle(args)
            return args
        } catch (err) {
            return rejectWithValue(null)
        }
    },
)
export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_args, {rejectWithValue}) => {
        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const deleteTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistsTC`,
    async (args:{todolistId: string}, {rejectWithValue}) => {
        try {
            await todolistsApi.deleteTodolist(args.todolistId)
            return args
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const {selectTodolists} = todolistsSlice.selectors
export const {
    createTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC
} = todolistsSlice.actions
export const todolistsSliceReducer = todolistsSlice.reducer

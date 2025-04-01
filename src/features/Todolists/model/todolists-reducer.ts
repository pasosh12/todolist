import {FilterValuesType, TodolistType} from '@/app/App.tsx'

import {
    // createAction, createReducer,
    createSlice, nanoid} from "@reduxjs/toolkit";

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

export const todolistsSlice=createSlice({
    name:'todolists',
    initialState:initialState,
    reducers:(create)=>{
        return{
            deleteTodolistAC:create.reducer<{ todolistId: string }>((state,action)=>{
                const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            changeTodolistTitleAC:create.reducer<{ todolistId: string, newTitle: string }>((state,action)=>{
                const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
                if (todolist) {
                    todolist.title = action.payload.newTitle
                }
            }),
            changeTodolistFilterAC:create.reducer<{ todolistId: string, newFilter: FilterValuesType }>((state,action)=> {
                const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
                if (index !== -1) {
                    state[index].filter = action.payload.newFilter
                }
            }),
            createTodolistAC:create.preparedReducer((title:string)=>({
                    payload:{
                        id:nanoid(),
                        title
                    }
                }),
                (state,action)=>{
                    state.push({...action.payload, filter: 'all'})
                }
            )
        }
    },
    // extraReducers:
})
export const {createTodolistAC,changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC}=todolistsSlice.actions
export const todolistsSliceReducer=todolistsSlice.reducer

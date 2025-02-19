import {FilterValuesType, TodolistType} from '../App'
import {v1} from "uuid";

const initialState: TodolistType[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | EditTodolistTitle | ChangeTodolistFilter

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actions): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(el => el.id !== action.payload.id) // логика удаления тудулиста
        }
        case 'create_todolist': {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist] // логика создания тудулиста
        }
        case 'edit_todolist_title': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)
        }
        case 'edit_todolist_filter': {
            return state.map((el) => el.id === action.payload.id ? {...el, filter: action.payload.newFilter} : el)
        }
        default:
            // throw new Error("I don't understand this type")
            return state
    }
}


export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title: title}} as const
}
export const editTodolistTitleAC = (id: string, newTitle: string) => {
    return {type: 'edit_todolist_title', payload: {id, newTitle}} as const
}
export const editTodolistFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {type: 'edit_todolist_filter', payload: {id, newFilter}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type EditTodolistTitle = ReturnType<typeof editTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof editTodolistFilterAC>
// export  type DeleteTodolistAction = {
//     type: 'delete_todolist'
//     payload: {
//         id:string
//     }
// }
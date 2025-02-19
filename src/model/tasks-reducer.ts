import {TasksState} from '../App'
import {v1} from "uuid";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

// let todolistId=v1();

const initialState: TasksState = {}

type Actions =
    CreateTodolistAction | DeleteTodolistAction | /// todolists
    DeleteTaskActionType | CreateTaskActionType
    | EditTaskTitleActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        // case 'delete_task': {
        //     return {...state, [todolistsId]: state[todolistsId].filter(t => t.id !== action.payload.id)}
        // }
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const copyTasksState = {...state}
            delete copyTasksState[action.payload.id]
            return copyTasksState
        }
        case 'create_task': {
            let todolistId = action.payload.todolistId;
            const newTask = {id: action.payload.id, title: action.payload.title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }
        // case 'delete_task': {
        //     let todolistId = action.payload.todolistId;
        //     const newTask = {id: action.payload.id, }
        //     return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        // }


        case 'edit_task_title': {
            let todolistId = action.payload.todolistId;

            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === action.payload.id ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            }
        }
        case 'edit_task_status': {
            let todolistId = action.payload.todolistId;

            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === action.payload.id ? {
                    ...task,
                    isDone: action.payload.newStatus
                } : task)
            }
        }
        default:
            throw new Error("I don't understand this type")
        // return state
    }
}

export const createTaskAC = (title: string, todolistId: string) => {
    return {type: 'create_task', payload: {todolistId, id: v1(), title}} as const
}

export const deleteTaskAC = (todolistId: string, id: string) => {
    return {type: 'delete_task', payload: {id, todolistId}} as const
}

export const editTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {type: 'edit_task_title', payload: {todolistId, id, newTitle}} as const
}
export const editTaskStatusAC = (todolistId: string, id: string, newStatus: boolean) => {
    return {type: 'edit_task_status', payload: {todolistId, id, newStatus}} as const
}

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export type EditTaskTitleActionType = ReturnType<typeof editTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof editTaskStatusAC>

// export  type DeleteTaskActionType = {
//     type: 'delete_task'
//     payload: {
//         id:string
//     }
// }
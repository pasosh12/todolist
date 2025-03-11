import {createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer} from "./tasks-reducer.ts";
import type {TasksState} from "../App.tsx";
import {test, expect, beforeEach} from 'vitest'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


let startState: TasksState = {};

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})


test('correct todoList should be created', () => {

    const endState: TasksState = tasksReducer(startState, createTodolistAC('newTodolist'))
    const keys=Object.keys(endState)
    const newKey = keys.find(k=>k!=='todolistId1' && k!=='todolistId2')
    if(!newKey){
        throw Error("New key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({todolistId:'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    // expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be created and added to start', () => {

    const endState: TasksState = tasksReducer(startState, createTaskAC('buy coffee', 'todolistId2' ))

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('buy coffee') //added to start

})

test('correct task should update its title', () => {
    let todolistId = 'todolistId2'
    let taskId='1'
    let newTitle = 'changed title'
    const endState: TasksState = tasksReducer(startState,changeTaskTitleAC({todolistId, taskId, newTitle}))
    const taskToChange = endState[todolistId].find(t=>t.id ==taskId)
    if(!taskToChange){
        throw Error("Not found such a task")
    }
    expect(taskToChange.title).toEqual(newTitle)
})

test('correct task should update its status', () => {
    let todolistId = 'todolistId2'
    let taskId='1'
    let newStatus = startState[todolistId].find(t => t.id === taskId)?.isDone;
    newStatus = newStatus !== undefined ? !newStatus : (() => { throw new Error("Task not found") })();

    const endState: TasksState = tasksReducer(startState,changeTaskStatusAC({todolistId, taskId, newStatus}))

    const taskToChange = endState[todolistId].find(t=>t.id ==taskId)
    const taskToChange2 = endState[todolistId].find(t=>t.id =='2')
    if(!taskToChange || !taskToChange2){
        throw Error("Not found such a task")
    }
    expect(taskToChange.isDone).toEqual(newStatus)
    expect(taskToChange2.isDone).toEqual(true)
})
test('correct task should be deleted', () => {
    const todolistTaskToDeleteId='todolistId1'
    const taskToDeleteId='1'
    const endState = tasksReducer(startState,deleteTaskAC({todolistId: todolistTaskToDeleteId, taskId:taskToDeleteId}))
    // console.log('startState',startState,'endState',endState)
    expect(endState[todolistTaskToDeleteId].length).toEqual(startState[todolistTaskToDeleteId].length-1)
})
import type { FilterValuesType, TodolistType } from "@/app/App.tsx"
import { test, expect, beforeEach } from "vitest"
import {
  createTodolistAC,
  deleteTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  todolistsReducer,
} from "../todolists-reducer.ts"
import { nanoid } from "@reduxjs/toolkit"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be created", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
test("correct todolist should creating new todolist", () => {
  const newTitle = "What to bake"
  const endState = todolistsReducer(startState, createTodolistAC(newTitle))
  expect(endState.length).toBe(3)
  // expect(endState[2].id).toBe(newListId)
  expect(endState[0].title).toBe(newTitle)
})
test("correct todolist should change its title", () => {
  const newTitle = "changed title"
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId1, title: newTitle }))
  expect(endState[0].title).toBe("changed title")
})
test("correct todolist should change its filter", () => {
  const newFilter: FilterValuesType = "completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ todolistId: todolistId1, newFilter }))
  expect(endState[0].filter).toBe("completed")
})

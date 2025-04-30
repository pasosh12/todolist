import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import TodolistTitle from "./TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { createTaskTC } from "../../model/tasks-Slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { DomainTodolist } from "@/features/Todolists/model/todolists-Slice.ts"

type PropsType = {
  todolist: DomainTodolist
}

export function TodolistItem({ todolist }: PropsType) {
  const dispatch = useAppDispatch()

  const createTaskHandler = (trimmedTitle: string) => {
    dispatch(createTaskTC({ title: trimmedTitle, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm onCreateItem={createTaskHandler} placeHolder={"Task title"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}

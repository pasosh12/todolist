import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import TodolistTitle from "./TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { useCreateTaskMutation } from "@/features/Todolists/api/tasksApi.ts"
import { DomainTodolist } from "@/features/Todolists/ui/Todolist/lib/types"

type PropsType = {
  todolist: DomainTodolist
}

export function TodolistItem({ todolist }: PropsType) {
  const [createTask] = useCreateTaskMutation()

  const createTaskHandler = (trimmedTitle: string) => {
    createTask({ todolistId: todolist.id, title: trimmedTitle })
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

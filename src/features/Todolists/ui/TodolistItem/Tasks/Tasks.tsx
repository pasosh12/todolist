import { List } from "@mui/material"
import { TaskItem } from "./TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/Todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/Todolists/ui/TodolistItem/Tasks/TaskSkeleton/TaskSkeleton.tsx"
import { DomainTodolist } from "@/features/Todolists/ui/Todolist/lib/types"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data: fetchedTasks, isLoading } = useGetTasksQuery(id)

  let filteredTasks = fetchedTasks?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Empty List</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem task={task} todolist={todolist} key={task.id} />
          })}
        </List>
      )}
    </>
  )
}

import { List } from "@mui/material"

import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { fetchTasksData, selectTasks } from "../../../model/tasks-Slice.ts"
import { TaskItem } from "./TaskItem/TaskItem.tsx"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums"
import { DomainTodolist } from "@/features/Todolists/model/todolists-Slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  // debugger
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  useEffect(() => {
    dispatch(fetchTasksData({ todolistId: id }))
  }, [])
  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.Completed)
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Empty List</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem task={task} todolistId={id} key={task.id} />
          })}
        </List>
      )}
    </>
  )
}

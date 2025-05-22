import { List } from "@mui/material"
import { TaskItem } from "./TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums"
import { DomainTodolist } from "@/features/Todolists/model/todolists-Slice.ts"
import { useGetTasksQuery } from "@/features/Todolists/api/tasksApi.ts"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  // const tasks = useAppSelector(selectTasks)
  const { data } = useGetTasksQuery(id)

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
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

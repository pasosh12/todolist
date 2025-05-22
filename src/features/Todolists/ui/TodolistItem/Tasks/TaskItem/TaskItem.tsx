import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/Todolists/api/tasksApi.ts"
import { createTaskModel } from "@/features/Todolists/utils"
import { TaskStatus } from "@/common/enums"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types.ts"
import { DomainTodolist } from "@/features/Todolists/ui/Todolist/lib/types"
import { getListItemsSx } from "@/common/styles"
import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}
export const TaskItem = ({ task, todolist }: Props) => {
  const todolistId = todolist.id

  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const deleteTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status: newStatusValue })
    updateTask({ todolistId, taskId: task.id, model })
  }
  const changeTaskTitle = (newTitle: string) => {
    const model = createTaskModel(task, { title: newTitle })
    updateTask({ todolistId, taskId: task.id, model })
  }
  const isDone = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"
  return (
    <ListItem sx={getListItemsSx(isDone)} disablePadding={true} key={task.id}>
      <Checkbox size={"medium"} onChange={changeTaskStatus} checked={isDone} disabled={disabled} />
      <EditableSpan title={task.title} onChangeTitle={changeTaskTitle} disabled={disabled} />
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}

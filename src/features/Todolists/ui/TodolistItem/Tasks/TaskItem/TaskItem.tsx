import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { getListItemsSx } from "@/TodolistItem.styles.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/Todolists/model/tasks-reducer.ts"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"

type Props = {
  task: DomainTask
  todolistId: string
}
export const TaskItem = (props: Props) => {
  const id = props.todolistId
  const task = props.task
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId: id, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(
      changeTaskStatusAC({
        todolistId: props.todolistId,
        taskId: task.id,
        newStatus: newStatusValue,
      }),
    )
  }
  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC({ todolistId: id, taskId: task.id, newTitle }))
  }
  const isDone = task.status === TaskStatus.Completed
  return (
    <ListItem sx={getListItemsSx(isDone)} disablePadding={true} key={task.id}>
      <Checkbox size={"medium"} onChange={changeTaskStatus} checked={isDone} />
      <EditableSpan title={task.title} onChangeTitle={changeTaskTitle} />
      <IconButton onClick={deleteTask}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}

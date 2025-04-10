import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { getListItemsSx } from "@/TodolistItem.styles.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { deleteTask, updateTasksData } from "@/features/Todolists/model/tasks-Slice.ts"
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
  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId: id, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(
      updateTasksData({
        todolistId: props.todolistId,
        taskId: task.id,
        model: { ...task, status: newStatusValue },
      }),
    )
  }
  const changeTaskTitle = (newTitle: string) => {
    dispatch(updateTasksData({ todolistId: id, taskId: task.id, model: { ...task, title: newTitle } }))
  }
  const isDone = task.status === TaskStatus.Completed
  return (
    <ListItem sx={getListItemsSx(isDone)} disablePadding={true} key={task.id}>
      <Checkbox size={"medium"} onChange={changeTaskStatus} checked={isDone} />
      <EditableSpan title={task.title} onChangeTitle={changeTaskTitle} />
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}

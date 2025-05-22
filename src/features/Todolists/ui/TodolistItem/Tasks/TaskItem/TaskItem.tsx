import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { getListItemsSx } from "@/TodolistItem.styles.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/Todolists/api/tasksApi.ts"
import { DomainTodolist } from "@/features/Todolists/model/todolists-Slice.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}
export const TaskItem = ({ task, todolist }: Props) => {
  const todolistId = todolist.id

  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const deleteTaskHandler = () => {
    // dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
    deleteTask({ todolistId, taskId: task.id })
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    // const model = createTaskModel(task)
    updateTask({ todolistId, taskId: task.id, model: { ...task, status: newStatusValue } })
    // dispatch(
    //   updateTasksDataTC({
    //     todolistId: props.todolistId,
    //     taskId: task.id,
    //     domainModel: { ...task, status: newStatusValue },
    //   }),
    // )
  }
  const changeTaskTitle = (newTitle: string) => {
    console.log(task.title, newTitle)
    updateTask({ todolistId, taskId: task.id, model: { ...task, title: newTitle } })
    // dispatch(updateTasksDataTC({ todolistId: id, taskId: task.id, domainModel: { ...task, title: newTitle } }))
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

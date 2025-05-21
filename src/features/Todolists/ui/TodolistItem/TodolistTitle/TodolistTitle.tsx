import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodolistType } from "@/app/App.tsx"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "@/features/Todolists/api/todolistsApi.ts"

type PropsType = {
  todolist: TodolistType
}
const TodolistTitle = ({ todolist }: PropsType) => {
  const { id, title } = todolist
  const [changeTodoListTitle] = useUpdateTodolistTitleMutation()
  const [deleteTodoList] = useRemoveTodolistMutation()
  const deleteTodoListHandler = () => {
    deleteTodoList(id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    changeTodoListTitle({ id, title: newTitle })
  }

  return (
    <h3>
      <EditableSpan title={title} onChangeTitle={changeTodolistTitle} />
      <IconButton onClick={deleteTodoListHandler}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </h3>
  )
}

export default TodolistTitle

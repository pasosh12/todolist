import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodolistType } from "@/app/App.tsx"
import { changeTodolistTitleTC, deleteTodolistTC } from "../../../model/todolists-Slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type PropsType = {
  todolist: TodolistType
}
const TodolistTitle = ({ todolist }: PropsType) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()
  const deleteTodoList = () => {
    dispatch(deleteTodolistTC(id))
  }
  const changeTodolistTitle = (newTitle: string) => {
    dispatch(changeTodolistTitleTC({ todolistId: id, title: newTitle }))
  }

  return (
    <h3>
      <EditableSpan title={title} onChangeTitle={changeTodolistTitle} />
      <IconButton onClick={deleteTodoList}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </h3>
  )
}

export default TodolistTitle

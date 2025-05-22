import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodolistType } from "@/app/App.tsx"
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/Todolists/api/todolistsApi.ts"
import { useAppDispatch } from "@/common/hooks"
import { RequestStatus } from "@/common/types"

type PropsType = {
  todolist: TodolistType
}
const TodolistTitle = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const { id, title } = todolist
  const [changeTodoListTitle] = useUpdateTodolistTitleMutation()
  const [deleteTodoList] = useRemoveTodolistMutation()
  const changeTodoListStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => {
          todolist.id === id
        })
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }
  const deleteTodoListHandler = () => {
    changeTodoListStatus("loading")
    deleteTodoList(id)
      .unwrap()
      .catch(() => {
        changeTodoListStatus("idle")
      })
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

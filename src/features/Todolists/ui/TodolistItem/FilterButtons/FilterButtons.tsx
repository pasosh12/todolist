import { FilterValuesType, TodolistType } from "@/app/App.tsx"
import { Box, Button } from "@mui/material"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { todolistsApi } from "@/features/Todolists/api/todolistsApi.ts"
import { containerSx } from "@/common/styles"

type PropsType = {
  todolist: TodolistType
}
export const FilterButtons = ({ todolist }: PropsType) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const changeFilterHandler = (value: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = value
        }
      }),
    )
  }
  return (
    <Box sx={containerSx}>
      <Button
        variant={"contained"}
        disableElevation
        color={filter === "all" ? "secondary" : "primary"}
        onClick={() => {
          changeFilterHandler("all")
        }}
      >
        All
      </Button>
      <Button
        variant={"contained"}
        disableElevation
        color={filter === "active" ? "secondary" : "primary"}
        onClick={() => changeFilterHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={"contained"}
        disableElevation
        color={filter === "completed" ? "secondary" : "primary"}
        onClick={() => changeFilterHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}

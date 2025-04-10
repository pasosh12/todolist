import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"
import { fetchTodolistsTC, selectTodolists } from "@/features/Todolists/model/todolists-Slice.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])
  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

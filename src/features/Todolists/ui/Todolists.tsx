import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/Todolists/api/todolistsApi.ts"
import { TodolistItem } from "@/features/Todolists/ui/TodolistItem/TodolistItem.tsx"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "5px 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

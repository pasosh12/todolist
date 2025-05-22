import Grid from "@mui/material/Grid2"
import { Box, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/Todolists/api/todolistsApi.ts"
import { TodolistItem } from "@/features/Todolists/ui/TodolistItem/TodolistItem.tsx"
import { TodolistSkeleton } from "@/features/Todolists/ui/Todolist/TodolistSkeleton/TodolistSkeleton.tsx"
import { containerSx } from "@/common/styles"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }
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

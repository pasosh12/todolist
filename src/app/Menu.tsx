import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "@/common/components"
import { Todolists } from "@/features/Todolists/ui/Todolist/Todolists.tsx"
import { useAddTodolistMutation } from "@/features/Todolists/api/todolistsApi.ts"

export const Menu = () => {
  const [addTodoList] = useAddTodolistMutation()

  return (
    <Container maxWidth="lg">
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm placeHolder={"New Todolists Title"} onCreateItem={addTodoList} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}

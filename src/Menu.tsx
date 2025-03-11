import {Container, Grid2} from "@mui/material";
import {AddItemForm} from "./AddItemForm.tsx";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "./model/todolists-reducer.ts";
import {Todolists} from "./Todolists.tsx";

export const Menu = () => {

    const dispatch = useAppDispatch();
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container maxWidth="lg">
            <Grid2 container sx={{p: '15px 0'}}>
                <AddItemForm placeHolder={'New Todolist Title'} onCreateItem={createTodolist}/>
            </Grid2>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>

    )
}
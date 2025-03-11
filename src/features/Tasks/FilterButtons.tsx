import {FilterValuesType, TodolistType} from "../../app/App.tsx";
import {containerSx} from "../../TodolistItem.styles.ts";
import {Box, Button} from "@mui/material";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "../../model/todolists-reducer.ts";

type PropsType = {
    todolist: TodolistType;
}
export const FilterButtons = ({todolist}: PropsType) => {
    const {id, filter} = todolist
    const dispatch = useAppDispatch();

    const changeFilterHandler = (value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistId: id, newFilter: value}))
    }
    return (
        <Box sx={containerSx}>
            <Button variant={'contained'}
                    disableElevation
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={'contained'}
                    disableElevation
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={'contained'}
                    disableElevation
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};


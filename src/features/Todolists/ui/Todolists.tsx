import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {TodolistItem} from "./TodolistItem/TodolistItem.tsx";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    return (
        <>
            {todolists.map(todolist => {
                return (
                    <TodolistItem todolist={todolist}/>
                )
            })
            }
        </>
    );
};

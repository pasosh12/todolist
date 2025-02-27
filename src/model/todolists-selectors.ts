import {RootState} from "../app/store.ts";
import {TodolistType} from "../App.tsx";

export const selectTodolists = (state:RootState):TodolistType[]=>state.todolists

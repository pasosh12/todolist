import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutlined} from "@mui/icons-material";

type AddItemFormPropsType = {
    onCreateItem: (title: string) => void,
    placeHolder?: string,
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (title.trim() !== "") {
            props.onCreateItem(trimmedTitle)
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createItemHandler();
        }
    }
    return (
        <div>
            <TextField
                label={props.placeHolder}
                variant="outlined"
                error={!!error}
                helperText={error}
                value={title}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <IconButton color={'secondary'} onClick={createItemHandler}>
                <AddCircleOutlined fontSize={'medium'}/>
            </IconButton>
        </div>
    )
}
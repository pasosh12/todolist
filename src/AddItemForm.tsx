import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type AddItemFormPropsType = {
    onCreateItem: (title: string) => void,
    placeHolder?: string,
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [itemTitle, setItemTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }
    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (itemTitle.trim() !== "") {
            props.onCreateItem(trimmedTitle)
            setItemTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            createItemHandler();
        }
    }
    return (
        <div>
            <input value={itemTitle}
                   placeholder={props.placeHolder}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button title={'+'} onClick={createItemHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
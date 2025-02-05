import {useState} from 'react';

type PropsType = {
    title: string,
    onChangeTitle: (newTitle: string) => void,
}

export const EditableSpan = ({title, onChangeTitle}: PropsType) => {

    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    return (
        isEditable ?
            <input value={newTitle}
                   autoFocus
                   onChange={(e) => setNewTitle(e.currentTarget.value)}
                   onBlur={() => {
                       setIsEditable(false)
                       onChangeTitle(newTitle)
                   }
                   }
            />
            : <span onDoubleClick={() => setIsEditable(true)}>{title}</span>

    );
};


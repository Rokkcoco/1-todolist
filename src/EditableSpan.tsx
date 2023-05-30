import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    title: string
    callback:(title: string)=>void
}
export const EditableSpan: FC<EditableSpanType> = ({callback, title}) => {
    const [titleInput, setTitleInput] = useState(title)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTaskHandler()
        }
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    const addTaskHandler = () => {
callback(titleInput)
    }

    return (
        edit ? <input value={titleInput} onBlur={editHandler} onChange={inputOnChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{titleInput}</span>
    );
};


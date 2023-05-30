import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    callback: ( titleInput: string)=>void

}

export const AddItemForm:FC<AddItemFormType> = ({callback}) => {
    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = () => {
        if (titleInput.trim() !== "") {
            callback(titleInput)
            setTitleInput('')
        } else {
            setError("Title is required")
        }
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    const inputOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === "Enter" && onClickButtonHandler()
    }

    return (
        <div>
            <input value={titleInput}
                   onChange={inputOnChangeHandler}
                   onKeyPress={inputOnKeyHandler}
                   className={error ? "error" : ""}/>
            {error && <div className={"error-message"}>{error}</div>}
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};


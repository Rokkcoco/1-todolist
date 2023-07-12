import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {AddItemForm, AddItemFormType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: "button clicked inside",
            //action: "clicked"
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callback: action("button clicked inside")
    },
};

const Comp = (props: AddItemFormType) => {
    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string | null>("Title is required")

    const onClickButtonHandler = () => {
        if (titleInput.trim() !== "") {
            props.callback(titleInput)
            setTitleInput('')
        } else {
            setError("Title is required")
        }
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.currentTarget.value)

//добавили проверку на наличие ошибки чтобы не было лишнего рендера
    const inputOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        e.key === "Enter" && onClickButtonHandler()
    }

    const buttonStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor: 'greenyellow'
    }
//!! превращаем строку в false, а второй раз превращаем в true
    return (
        <div>
            <TextField
                error={!!error}
                value={titleInput}
                id="outlined-basic"
                label={error ? "Title is required" : "Type something"}
                variant="outlined"
                size="small"
                onChange={inputOnChangeHandler}
                onKeyPress={inputOnKeyHandler}
            />
            <Button style={buttonStyles} variant="contained" onClick={onClickButtonHandler}>+</Button>
        </div>
    )
}

export const AddItemFormErrorStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: (args) => <Comp callback={action("button clicked inside")}/>
}



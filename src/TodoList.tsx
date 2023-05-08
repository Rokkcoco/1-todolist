import React, {ChangeEvent, FC, KeyboardEvent, useState, MouseEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId:string) => void
    changeFilter: (filter:FilterValuesType) => void
    addTask: (title:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({tasks, title, removeTask, changeFilter, addTask}) => {
    const [titleInput, setTitleInput] = useState<string>('')

    const onClickButtonHandler = () => {
        addTask(titleInput)
        setTitleInput('')
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    const inputOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickButtonHandler()
    }

    const setFilterAll = () =>{
       changeFilter("all")
    }

    const setFilterActive = () =>{
        changeFilter("active")
    }

    const setFilterCompleted = () =>{
        changeFilter("completed")
    }

    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        const removeTaskHandler = (e:MouseEvent<HTMLButtonElement>) => {
            removeTask(task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        )
    })

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input value={titleInput}
                       onChange={inputOnChangeHandler}
                       onKeyPress={inputOnKeyHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={setFilterAll}>All</button>
                <button onClick={setFilterActive}>Active</button>
                <button onClick={setFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList;
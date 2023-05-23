import React, {ChangeEvent, FC, KeyboardEvent, useState, MouseEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId:string) => void
    changeFilter: (todolistID:string, filter:FilterValuesType) => void
    addTask: (todolistID: string, title:string)=>void
    changeTaskStatus: (todolistID: string, taskId:string, isDone:boolean)=>void
    filter: FilterValuesType
    removeTodolist: (todolistID: string)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({removeTodolist, todolistID, tasks, title, removeTask, changeFilter, addTask, changeTaskStatus, filter}) => {
    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = () => {
        if (titleInput.trim() !== "") {
            addTask(todolistID, titleInput)
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

    const setFilterAll = () =>{
       changeFilter(todolistID, "all")
    }

    const setFilterActive = () =>{
        changeFilter(todolistID,"active")
    }

    const setFilterCompleted = () =>{
        changeFilter(todolistID,"completed")
    }

    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        const removeTaskHandler = (e:MouseEvent<HTMLButtonElement>) => {
            removeTask(todolistID, task.id)
        }
        const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
            const newStatus = e.currentTarget.checked
            changeTaskStatus(todolistID, task.id, newStatus)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeInputHandler}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        )
    })

    const removeTodolistHanlder = () => {
        removeTodolist(todolistID)
    }

    return (
        <div className="todoList">
            <h3>
                {title}
                <button onClick={removeTodolistHanlder}>X</button>
            </h3>
            <div>
                <input value={titleInput}
                       onChange={inputOnChangeHandler}
                       onKeyPress={inputOnKeyHandler}
                    className={error ? "error" : ""}/>
                {error && <div className={"error-message"}>{error}</div>}
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={setFilterAll}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={setFilterActive}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={setFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList;
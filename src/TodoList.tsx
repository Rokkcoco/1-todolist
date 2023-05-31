import React, {ChangeEvent, FC, MouseEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    updateTask: (todolistID:string, taskID:string, title:string)=>void
    updateTodolist: (todolistID:string, title:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = ({updateTodolist, updateTask, removeTodolist, todolistID, tasks, title, removeTask, changeFilter, addTask, changeTaskStatus, filter}) => {

    const setFilterAll = () => changeFilter(todolistID, "all")


    const setFilterActive = () => changeFilter(todolistID,"active")


    const setFilterCompleted = () => changeFilter(todolistID,"completed")


    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        const removeTaskHandler = (e:MouseEvent<HTMLButtonElement>) => removeTask(todolistID, task.id)

        const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
            const newStatus = e.currentTarget.checked
            changeTaskStatus(todolistID, task.id, newStatus)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeInputHandler}/>
                <EditableSpan title={task.title} callback={(updateTitle)=>updateTaskHandler(task.id, updateTitle)}/>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        )
    })

    const removeTodolistHandler = () => removeTodolist(todolistID)

    const addTaskHandler = (title: string) => addTask(todolistID, title)


    const updateTaskHandler = (taskID:string, title: string) => updateTask(todolistID, taskID, title)


    const updateTodolistHandler = (title:string) => updateTodolist(todolistID, title)


    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={title} callback={(updateTitle)=>updateTodolistHandler(updateTitle)}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
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
import React, {FC, memo, useCallback, useEffect} from 'react';

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {getTasksTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";
import {FilterValuesType} from "./AppWithRedux";

type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

// export type OldTaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
const TodoList: FC<TodoListPropsType> = memo(({
                                                  changeTodolistTitle,
                                                  changeTaskTitle,
                                                  removeTodolist,
                                                  todolistID,
                                                  tasks,
                                                  title,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeTaskStatus,
                                                  filter
                                              }) => {

    const setFilterAll = useCallback(() => changeFilter(todolistID, "all"),[changeFilter, todolistID])


    const setFilterActive = useCallback(() => changeFilter(todolistID, "active"),[changeFilter, todolistID])


    const setFilterCompleted = useCallback(() => changeFilter(todolistID, "completed"),[changeFilter, todolistID])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(todolistID))
    },[])

    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const removeTodolistHandler = () => removeTodolist(todolistID)

    const addTaskHandler = useCallback((title: string) => addTask(todolistID, title), [addTask, todolistID])


    const updateTodolistHandler = useCallback((title: string) => changeTodolistTitle(todolistID, title), [changeTodolistTitle, todolistID])

    const removeTaskHandler = useCallback((taskID: string) => removeTask(todolistID, taskID), [removeTask, todolistID])

    const changeTaskStatusHandler = useCallback((taskID: string, newStatus: TaskStatuses) => {
        changeTaskStatus(todolistID, taskID, newStatus)
    }, [changeTaskStatus, todolistID])

    const changeTaskFilter = useCallback((taskID: string,updateTitle:string) => {
        changeTaskTitle(todolistID, taskID, updateTitle)
    }, [changeTaskTitle, todolistID])

    const tasksJSX: Array<JSX.Element> = tasks.map((task) => {
        return <Task key={task.id} task={task} removeTask={removeTaskHandler} changeTaskStatus={changeTaskStatusHandler} updateTask={changeTaskFilter}/>
    })


    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={title} callback={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <ButtonWithMemo  variant={filter === "all" ? "outlined" : "contained"} color={"primary"}
                                 onClick={setFilterAll}
                                title={'All'}/>
                <ButtonWithMemo  variant={filter === "active" ? "outlined" : "contained"} color={"success"}
                                 onClick={setFilterActive}
                                title={'Active'}/>
                <ButtonWithMemo  variant={filter === "completed" ? "outlined" : "contained"} color={"error"}
                                 onClick={setFilterCompleted}
                                title={'Completed'}/>
                {/*<Button variant={filter === "all" ? "outlined" : "contained"} color="primary"*/}
                {/*        onClick={setFilterAll}>All</Button>*/}
                {/*<Button variant={filter === "active" ? "outlined" : "contained"} color="success"*/}
                {/*        onClick={setFilterActive}>Active</Button>*/}
                {/*<Button variant={filter === "completed" ? "outlined" : "contained"} color="error"*/}
                {/*        onClick={setFilterCompleted}>Completed</Button>*/}
            </div>
        </div>
    )
})
type ButtonWithMemoPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: "text" | "outlined" | "contained"
    onClick: () => void
}
const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return  <Button variant={props.variant} color={props.color}
                    onClick={props.onClick}>{props.title}</Button>
})

export default TodoList;
import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistAC
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

function AppWithRedux(): JSX.Element {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>( state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = (todolistID: string, taskId: string): void => {
        dispatch(removeTaskAC(todolistID, taskId))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }


    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    const updateTask = (todolistID: string, taskID:string, title: string) => {
        dispatch(updateTaskAC(todolistID, taskID, title))
    }

    const updateTodolist = (todolistID: string, title: string) => {
        dispatch(updateTodolistAC(todolistID, title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
            <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id]
                if (t.filter === "active") tasksForTodolist = tasks[t.id].filter(t => !t.isDone)

                if (t.filter === "completed") tasksForTodolist = tasks[t.id].filter(t => t.isDone)

                return <Grid item>
                    <Paper style={{padding: "25px"}} elevation={5}>
                    <TodoList key={t.id}
                              todolistID={t.id}
                              tasks={tasksForTodolist}
                              title={t.title}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}
                              removeTodolist={removeTodolist}
                              updateTask={updateTask}
                              updateTodolist={updateTodolist}/>
                    </Paper>
                </Grid>
            })}
                </Grid>
        </Container>
        </div>
    );
}

export default AppWithRedux;

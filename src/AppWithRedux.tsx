import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    getTodolists,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskStatusTC,
    changeTaskTitleAC,
    deleteTaskTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type FilterValuesType = "all" | "active" | "completed"


export type TaskAssocType = {
    [key: string]: TaskType[]
}

const AppWithRedux = (): JSX.Element => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>( state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolists())
    },[])

    const removeTask = useCallback((todolistID: string, taskId: string): void => {
        dispatch(deleteTaskTC(todolistID, taskId))
    },[])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title))
    },[])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, status: number) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, status))
    },[])


    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    },[])

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    },[])
//диспатч создается 1 раз , смысла писать его нет, но чтобы не было ворнинга в консоли надо добавить диспатч в []
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((todolistID: string, taskID:string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    },[])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    },[])
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
            <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map(t => {
                return <Grid item>
                    <Paper style={{padding: "25px"}} elevation={5}>
                    <TodoList key={t.id}
                              todolistID={t.id}
                              tasks={tasks[t.id]}
                              title={t.title}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}/>
                    </Paper>
                </Grid>
            })}
                </Grid>
        </Container>
        </div>
    );
};

export default AppWithRedux;

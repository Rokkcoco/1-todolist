import {TaskAssocType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TaskAssocType, action: TasksActionType):TaskAssocType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [todolistID]:tasks[todolistID].filter(t => t.id !== taskId)}
        case "ADD-TASK":
            return {...state, [todolistID]:[{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]}
        case "ADD-TODOLIST":
            return {...state, [todolistId]:[]}
        case "UPDATE-TASK":
            return {...state, [todolistID]:tasks[todolistID].map(t=> t.id === taskID ? {...t, title} : t)}
        case "DELETE-TASK":
            delete tasks[todolistID]
            return state
        default:
            return state
    }
}

type TasksActionType = RemoveTaskType | AddTaskType | AddTodolistType | UpdateTaskType | DeleteTaskType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type DeleteTaskType = ReturnType<typeof deleteTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    payload: {
        todolistID,
        taskID
    }
})

export const addTaskAC = (todolistID: string, title: string) => ({
    type: "ADD-TASK",
    payload: {
        todolistID,
        title
    }
})

export const addTodolistAC = (todolistID: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        todolistID
    }
})

export const updateTaskAC = (todolistID: string, taskID: string, title: string) => ({
    type: "UPDATE-TASK",
    payload: {
        todolistID,
        taskID,
        title
    }
})

export const deleteTaskAC = (todolistID:string) => ({
    type: "DELETE-TASK",
    payload: {
        todolistID
    }
})


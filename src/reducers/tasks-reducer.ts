import {TaskAssocType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";


export const tasksReducer = (state: TaskAssocType, action: TasksActionType):TaskAssocType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)}
        case "ADD-TASK":
            return {...state, [action.payload.todolistID]:[{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistID]]}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistID]:[]}
        case "UPDATE-TASK":
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(t=> t.id === action.payload.taskID ? {...t, title: action.payload.title} : t)}
        case "REMOVE-TODOLIST":
            delete state[action.payload.todolistID]
            return state
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)}
        default:
            return state
    }
}

//const {payload} = action деструктурирование


type TasksActionType = RemoveTaskType | AddTaskType | AddTodolistType | UpdateTaskType | ChangeTaskStatusType | RemoveTodolistType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    payload: {
        todolistID,
        taskID
    }
}as const)

export const addTaskAC = (todolistID: string, title: string) => ({
    type: "ADD-TASK",
    payload: {
        todolistID,
        title
    }
}as const)

export const updateTaskAC = (todolistID: string, taskID: string, title: string) => ({
    type: "UPDATE-TASK",
    payload: {
        todolistID,
        taskID,
        title
    }
}as const)

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        todolistID,
        taskID,
        isDone
    }
}as const)


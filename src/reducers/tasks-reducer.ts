import {TaskAssocType} from "../App";
import {v1} from "uuid";


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
        case "DELETE-TASK":
            delete state[action.payload.todolistID]
            return state
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)}
        default:
            return state
    }
}

//const {payload} = action деструктурирование


type TasksActionType = RemoveTaskType | AddTaskType | AddTodolistType | UpdateTaskType | DeleteTaskType | ChangeTaskStatusType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type AddTodolistType = ReturnType<typeof addTasksForTodolistAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type DeleteTaskType = ReturnType<typeof deleteTaskAC>
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

export const addTasksForTodolistAC = (todolistID: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        todolistID
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

export const deleteTaskAC = (todolistID:string) => ({
    type: "DELETE-TASK",
    payload: {
        todolistID
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


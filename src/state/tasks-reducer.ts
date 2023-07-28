import {TaskAssocType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType} from "./store";


const initialState: TaskAssocType = {}

export const tasksReducer = (state: TaskAssocType = initialState, action: TasksActionType): TaskAssocType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            }
        case "ADD-TASK":
            return {...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistID]: []}
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.payload.todolistID]
            // return copyState
            const {[action.payload.todolistID]: [], ...rest} = state
            return rest
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        default:
            return state
    }
}

//const {payload} = action деструктурирование, деструктурузацция создает новый объект


export type TasksActionType =
    RemoveTaskType
    | AddTaskType
    | AddTodolistType
    | UpdateTaskType
    | ChangeTaskStatusType
    | RemoveTodolistType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    payload: {
        todolistID,
        taskID
    }
} as const)

export const addTaskAC = (task: TaskType, todolistID: string) => ({
    type: "ADD-TASK",
    payload: {
        todolistID,
        task
    }
} as const)

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    payload: {
        todolistID,
        taskID,
        title
    }
} as const)

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        todolistID,
        taskID,
        status
    }
} as const)

export const setTasksAC = (todolistID: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    payload: {
        tasks,
        todolistID
    }
} as const)

export const getTasksTC = (todolistID: string) => async (dispatch: Dispatch) => {
    const tasks = await todolistsAPI.getTasks(todolistID)
    dispatch(setTasksAC(todolistID, tasks.data.items))
}

export const deleteTaskTC = (todolistID: string, taskID: string) => async (dispatch: Dispatch) => {
    await todolistsAPI.deleteTask(todolistID, taskID)
    dispatch(removeTaskAC(todolistID, taskID))
}

export const addTaskTC = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    const task = await todolistsAPI.addTask(todolistID, title)
    dispatch(addTaskAC(task.data.data.item, todolistID))
}

export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistID].find(t => t.id === taskID)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status
        }
        await todolistsAPI.updateTask(todolistID, taskID, model)
        dispatch(changeTaskStatusAC(todolistID, taskID, status))
    }
}
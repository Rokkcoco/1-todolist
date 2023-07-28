import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    addTodolist(title: string) {
        return instance.post<CreateResponseType<{item: TodolistType}>, AxiosResponse<CreateResponseType<{ item: TodolistType }>>, { title: string }>("todo-lists", {title})
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<CreateResponseType,  AxiosResponse<CreateResponseType>, { title: string }>(`todo-lists/${todolistID}`, {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<CreateResponseType>(`todo-lists/${todolistID}`)
    },
    getTasks(todolistID:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`)
    },
    addTask(todolistID:string, title:string) {
        return instance.post<CreateResponseType<{item : TaskType}>,  AxiosResponse<CreateResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistID}/tasks`, {title})
    },
    updateTask(todolistID:string, taskID:string, model: UpdateTaskModelType) {
        return instance.put<CreateResponseType<{item : TaskType}>,  AxiosResponse<CreateResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
    deleteTask(todolistID:string, taskID:string) {
        return instance.delete<CreateResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    }
}

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type CreateResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

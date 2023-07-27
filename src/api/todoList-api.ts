import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})
export const todoListApi = {
    getTodos() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    addTodo(title: string) {
        return instance.post<CreateResponseType<{item: TodolistType}>, AxiosResponse<CreateResponseType<{ item: TodolistType }>>, { title: string }>("todo-lists", {title})
    },
    updateTodo(todolistID: string, title: string) {
        return instance.put<CreateResponseType,  AxiosResponse<CreateResponseType>, { title: string }>(`todo-lists/${todolistID}`, {title})
    },
    deleteTodo(todolistID: string) {
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

type TodolistType = {
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

type TaskType = {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: null
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

type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

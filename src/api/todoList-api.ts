import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})
export const todoListApi = {
    getTodos() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    addTodo(title: string) {
        return instance.post<CreateResponseType<{item: TodoListType[]}>>("todo-lists", {title})
    },
    updateTodo(todolistID: string, title: string) {
        return instance.put<CreateResponseType>(`todo-lists/${todolistID}`, {title})
    },
    deleteTodo(todolistID: string) {
        return instance.delete<CreateResponseType>(`todo-lists/${todolistID}`)
    },
    getTasks(todolistID:string) {
        return instance.get<{items: TaskType[]}>(`todo-lists/${todolistID}/tasks`)
    },
    addTask(todolistID:string, title:string) {
        return instance.post<CreateResponseType<{item : TaskType[]}>>(`todo-lists/${todolistID}/tasks`, {title})
    },
    updateTask(todolistID:string, taskID:string, model: UpdateTaskModelType) {
        return instance.put<CreateResponseType<{item : TaskType[]}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
    deleteTask(todolistID:string, taskID:string) {
        return instance.delete<CreateResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    }
}

type TodoListType = {
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

type UpdateTaskModelType = {
    title: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

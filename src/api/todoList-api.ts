import axios from "axios";


const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})

export const todoListApi = {
    get() {
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

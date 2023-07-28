import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {FilterValuesType} from "../AppWithRedux";

const initialState: TodolistDomainType[] = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.value} : t)
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.todolistID)
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todolistID, title: action.payload.title, filter: "all", addedDate: '', order: 0}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(t => ({...t, filter: "all"}))
        }
        default:
            return state
    }
}

//const {payload} = action деструктурирование, деструктурузацция создает новый объект

export type TodolistsActionType = ChangeFilterType | RemoveTodolistType | UpdateTodolistType | AddTodolistType | SetTodolistsType
type ChangeFilterType = ReturnType<typeof changeTodolistFilterAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type UpdateTodolistType = ReturnType<typeof changeTodolistTitleAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

export const changeTodolistFilterAC = (todolistID: string, value: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        todolistID,
        value
    }
} as const)

export const removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistID
    }
} as const)

export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todolistID,
        title
    }
} as const)

export const addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        todolistID: v1(),
        title
    }
} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS",
    payload: {
        todolists
    }
}as const)

export const getTodolists = () => async (dispatch: Dispatch) => {
    const todos = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(todos.data))
}
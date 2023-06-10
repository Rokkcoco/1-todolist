import {FilterValuesType, TodolistsType} from "../App";

export const todolistsReducer = (state: TodolistsType[], action: TodolistsActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.value} : t)
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.todolistID)
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todolistID, title: action.payload.title, filter: "all"}]
        case "UPDATE-TODOLIST":
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        default:
            return state
    }
}


type TodolistsActionType = ChangeFilterType | RemoveTodolistType | UpdateTodolistType | AddTodolistType
type ChangeFilterType = ReturnType<typeof changeFilterAC>
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type UpdateTodolistType = ReturnType<typeof updateTodolistAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => ({
    type: "CHANGE-FILTER",
    payload: {
        todolistID,
        value
    }
}as const)

export const removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistID
    }
}as const)

export const updateTodolistAC = (todolistID: string, title: string) => ({
 type: "UPDATE-TODOLIST",
    payload: {
     todolistID,
        title
    }
}as const)

export const addTodolistAC = (todolistID: string, title: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        todolistID,
        title
    }

}as const)
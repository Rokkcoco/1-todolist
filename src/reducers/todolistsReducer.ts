import {FilterValuesType, TodolistsType} from "../App";

export const todolistsReducer = (state: TodolistsType[], action: TodolistsActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return todolists.map(t => t.id === todolistID ? {...t, filter: value} : t)
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== todolistID)
        case "ADD-TODOLIST":
            return [...todolists, {id: todolistID, title, filter: "all"}]
        case "UPDATE-TODOLIST":
            return todolists.map(t => t.id === todolistID ? {...t, title} : t)
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
})

export const removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistID
    }
})

export const updateTodolistAC = (todolistID: string, title: string) => ({
 type: "UPDATE-TODOLIST",
    payload: {
     todolistID,
        title
    }
})

export const addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        title
    }

})
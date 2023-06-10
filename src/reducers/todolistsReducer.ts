import {FilterValuesType} from "../App";


const changeFilterAC = (todolistID: string, value: FilterValuesType) => ({
    type: "CHANGE-FILTER",
    payload: {
        todolistID,
        value
    }
})

const removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistID
    }
})

const updateTodolistAC = (todolistID: string, title: string) => {

}
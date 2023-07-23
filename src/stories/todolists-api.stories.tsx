import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.get()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = "YOYO"

    useEffect(() => {
        todoListApi.addTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "0f873401-b5d3-4199-9c45-eca5a6556cd5"

    useEffect(() => {
        todoListApi.deleteTodo(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "3f8515d3-314d-4622-b498-6728336a98c3"
    const title = "JS"

    useEffect(() => {
        todoListApi.updateTodo(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
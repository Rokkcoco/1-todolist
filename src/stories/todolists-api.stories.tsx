import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
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
        todolistsAPI.addTodolist(title)
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
        todolistsAPI.deleteTodolist(todolistID)
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
        todolistsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "5723eb4d-7de7-4535-8809-abb568c527c8"
    useEffect(() => {
        todolistsAPI.getTasks(todolistID).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "5723eb4d-7de7-4535-8809-abb568c527c8"
    useEffect(() => {
        todolistsAPI.addTask(todolistID, "NENE").then((res) => {
            setState(res.data.data.item)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "5723eb4d-7de7-4535-8809-abb568c527c8"
    const taskID = "e2c3b96c-a0a9-4ae7-8713-4998ccd84db6"
    useEffect(() => {
        todolistsAPI.updateTask(todolistID, taskID,{title: "MOBMOBSS"}).then((res) => {
            console.log(res.data)
            setState(res.data.data.item)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "5723eb4d-7de7-4535-8809-abb568c527c8"
    const taskID = "9b266300-818d-42d3-94ed-0db2860704cb"
    useEffect(() => {
        todolistsAPI.deleteTask(todolistID, taskID).then((res) => {
            console.log(res)
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App(): JSX.Element {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    const removeTask = (taskId: string): void => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === taskId) as TaskType
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        return filter === "active" ? tasks.filter(t => !t.isDone) : filter === "completed" ? tasks.filter(t => t.isDone) : tasks;
    }

    // const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType):TaskType[] =>  { Свитч аналог
    //     switch (filter) {
    //         case 'Active':
    //             return tasks.filter(t => !t.isDone)
    //         case 'Completed':
    //             return  tasks.filter(t=> t.isDone)
    //         default:
    //             return tasks
    //     }
    // }

    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)



    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: value} : t))
    }

    return (
        <div className="App">
            {todolists.map(t => {
                let tasksForTodolist = tasks
                if (t.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone)
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone)
                }
                return (
                    <TodoList key={t.id}
                              todolistID={t.id}
                              tasks={tasksForTodolist}
                              title={t.title}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}/>
                )
            })}


        </div>
    );
}

export default App;

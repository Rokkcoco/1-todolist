import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all"|"active"|"completed"

function App(): JSX.Element {
    const title: string = "what to learn";

    const [tasks, setTasks] =  useState<TaskType[]> ([
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JS/ES6/TS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: string):void => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }

    const addTask = (title:string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId:string, isDone:boolean) =>{
        const task = tasks.find(t => t.id === taskId) as TaskType
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    const getFilteredTasks= (tasks:Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
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


    return (
        <div className="App">
            <TodoList tasks={filteredTasks}
                      title={title}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>

        </div>
    );
}

export default App;

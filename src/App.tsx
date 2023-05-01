import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all"|"active"|"completed"

function App(): JSX.Element {
    const title: string = "what to learn";
    const [tasks, setTasks] =  useState<TaskType[]> ([
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS/ES6/TS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }

    const getFilteredTasks = (tasks:Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
        return filter === "active" ? tasks.filter(t => !t.isDone) : filter === "completed" ? tasks.filter(t => t.isDone) : tasks;
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)


    return (
        <div className="App">
            <TodoList tasks={filteredTasks} title={title} removeTask={removeTask} changeFilter={changeFilter}/>

        </div>
    );
}

export default App;

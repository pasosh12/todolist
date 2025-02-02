import {useState} from 'react';
import './App.css';
import {TaskType, TodolistItem} from './TodolistItem.tsx';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TasksState = {
    [todolistID: string]: TaskType[]
}
export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksState>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todolistsId: string, id: string) {
        let filteredTasks = tasks[todolistsId].filter(t => t.id !== id);
        const nextState: TasksState = {...tasks, [todolistsId]: filteredTasks}
        setTasks(nextState);
    }

    function addTask(todolistsId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistsId]: [newTask, ...tasks[todolistsId]]};
        setTasks(newTasks);
    }

    function changeStatus(todolistsId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistsId]: tasks[todolistsId].map(t => t.id === taskId ? {...t, isDone} : t)});

    }

    const deleteTodolist = (todolistsId: string) => {
        const nextState: todolistsType[] = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(nextState)
        delete tasks[todolistsId]
    }


    function changeFilter(value: FilterValuesType, todolistsId: string) {
        const el = todolists.find(t => t.id === todolistsId)
        if (el) el.filter = value
        const nextState: todolistsType[] = todolists.map(t => t.id === todolistsId ? {...t, filter: value} : t)
        // setTodolists([...todolists])
        setTodolists(nextState)
    }

    const todolistsItems = todolists.map(t => {
            let tasksForTodolist = tasks[t.id];
            if (t.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }
            if (t.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }
            return (
                <TodolistItem
                    key={t.id}
                    todolistsId={t.id}
                    title={t.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={t.filter}
                    deleteTodolist={deleteTodolist}
                />
            )
        }
    )

    return (
        <div className="App">
            {todolistsItems}
        </div>
    );
}

export default App;

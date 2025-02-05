import {useState} from 'react';
import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";
import Paper from "@mui/material/Paper";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TasksState = {
    [todolistID: string]: TaskType[]
}


function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    });

//tasks
    //C
    function addTask(title: string, todolistsId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistsId]: [newTask, ...tasks[todolistsId]]};
        setTasks(newTasks);
    }

    //U
    function changeTaskStatus(isDone: boolean, todolistsId: string, taskId: string) {
        setTasks({...tasks, [todolistsId]: tasks[todolistsId].map(t => t.id === taskId ? {...t, isDone} : t)});

    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        const newState: TasksState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task)
        }
        setTasks(newState)
    }

    //D
    function removeTask(todolistsId: string, id: string) {
        let filteredTasks = tasks[todolistsId].filter(t => t.id !== id);
        const nextState: TasksState = {...tasks, [todolistsId]: filteredTasks}
        setTasks(nextState);
    }

    //todoLists
    //C
    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        const nextState: TodolistType[] = [newTodolist, ...todolists,]
        setTodolists(nextState)
        const nextTasksState: TasksState = {...tasks, [newTodolistId]: []}
        setTasks(nextTasksState)
    }

    //U
    const changeTodolistFilter = (value: FilterValuesType, todolistsId: string) => {
        const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistsId ? {...tl, filter: value} : tl)
        setTodolists(nextState)
    }
    const changeTodolistTitle = (title: string, todolistsId: string) => {
        const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistsId ? {...tl, title} : tl)
        setTodolists(nextState)
    }

    //D
    const deleteTodolist = (todolistsId: string) => {
        const nextState: TodolistType[] = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(nextState)
        delete tasks[todolistsId]
    }


    const todolistsItems = todolists.map(tl => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }
            return (
                <Paper style={{padding: "10px"}}>
                    <TodolistItem
                        key={tl.id}
                        todolistsId={tl.id}
                        todoListTitle={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        deleteTodolist={deleteTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            )
        }
    )

    return (
        <div className="App">
            <div>
                <Paper style={{padding: "10px"}}>
                    <h3>Add new To_do_list</h3>
                    <AddItemForm onCreateItem={createTodolist} placeHolder={'Todo title'}/>
                </Paper>
            </div>

            {todolistsItems}

        </div>
    );
}

export default App;

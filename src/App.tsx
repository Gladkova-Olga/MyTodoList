import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1();
    const todoListID_2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ]
    });


    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks});
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoLiscID: string) {
        let task = tasks[todoLiscID].find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }

    }

    function changeFilter(value: FilterValueType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodoList(todiListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todiListID));
        delete tasks[todiListID];
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID: string = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all',
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({[newTodoListID]: [], ...tasks})
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }


    const todoListComponent = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
        }
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
        }

        return (
            <Grid item>
                <Paper elevation={2} style={{padding: '10px'}}>
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        todoListID={tl.id}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponent}
                </Grid>
            </Container>

        </div>
    );
}


export default App;


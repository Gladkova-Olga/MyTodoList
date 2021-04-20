import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatch(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatch(action);
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(id, isDone, todoListID);
        dispatch(action);
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(id, title, todoListID);
        dispatch(action);
    }

    function removeTodoList(id: string) {
        const action = removeTodoListAC(id);
        dispatch(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatch(action);
    }

    function changeFilter(value: FilterValueType, id: string) {
        const action = changeTodoListFilterAC(value, id);
        dispatch(action);
    }

    function changeTodoListTitle(title: string, id: string) {
        const action = changeTodoListTitleAC(title, id);
        dispatch(action);
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


import React, {useReducer} from 'react';
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
    const todoListID_1 = v1();
    const todoListID_2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
        const action = removeTaskAC(id, todoListID);
        dispatchTasks(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatchTasks(action);
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(id, isDone, todoListID);
        dispatchTasks(action);
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(id, title, todoListID);
        dispatchTasks(action);
    }

    function removeTodoList(id: string) {
        const action = removeTodoListAC (id);
        dispatchTasks(action);
        dispatchTodoLists(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchTasks(action);
        dispatchTodoLists(action)
    }

    function changeFilter(value: FilterValueType, id: string) {
        const action = changeTodoListFilterAC(value, id);
        dispatchTodoLists(action);
    }

    function changeTodoListTitle(title: string, id: string) {
        const action = changeTodoListTitleAC(title, id);
        dispatchTodoLists(action);
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


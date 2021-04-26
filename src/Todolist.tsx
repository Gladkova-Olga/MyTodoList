import React, {ChangeEvent, useCallback} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type Todolist = {
    title: string
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (value: string, todoListID: string) => void;
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValueType
    changeTaskTitle: (id: string, newTitle: string, todoLiscID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo(function (props: Todolist) {
    console.log("Todolist called")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID);
    }, [props.addTask, props.todoListID]);

    const onSelectAll = useCallback(() => {
        props.changeFilter('all', props.todoListID)
    }, [props.changeFilter, props.todoListID])

    const onSelectActive = useCallback(() => {
            props.changeFilter('active', props.todoListID)
        },
        [props.changeFilter, props.todoListID])

    const onSelectCompleted = useCallback(() => {
        props.changeFilter('completed', props.todoListID)
    }, [props.changeFilter, props.todoListID])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListID)
    }, [props.changeTodoListTitle, props.todoListID])

    const removeTodoList = useCallback(() => {
            props.removeTodoList(props.todoListID)
        },
        [props.removeTodoList, props.todoListID]);

    let tasksForTodoList = props.tasks;
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
    }
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
    }
    const task = tasksForTodoList.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  changeTaskStatus={props.changeTaskStatus}
                  changeTaskTitle={props.changeTaskTitle}
                  removeTask={props.removeTask}
                  todoListID={props.todoListID}/>
        )

    })


    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {task}
            </div>
            <div>
                <Button
                    onClick={onSelectAll}
                    color={'default'}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}

                >All</Button>
                <Button
                    onClick={onSelectActive}
                    color={'secondary'}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                >Active
                </Button>
                <Button onClick={onSelectCompleted}
                        color={'primary'}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                >Completed
                </Button>
            </div>
        </div>
    )
})
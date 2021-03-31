import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export function Todolist(props: Todolist) {

   const addTask = (title:string) => {
       props.addTask(title, props.todoListID);
   }

    const onSelectAll = () => {
        props.changeFilter('all', props.todoListID)
    }
    const onSelectActive = () => {
        props.changeFilter('active', props.todoListID)
    }
    const onSelectCompleted = () => {
        props.changeFilter('completed', props.todoListID)
    }
    const changeTodoListTitle = (newTitle: string) => {
       props.changeTodoListTitle(newTitle, props.todoListID)
    }

    const task = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID);
        }
        return (
            <div key = {t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    color = {'primary'}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />

                <EditableSpan
                    title={t.title}
                    changeTitle= {changeTaskTitle}
                />
                <IconButton size={'small'} onClick={removeTask}>
                    <Delete/>
                </IconButton>

            </div>
        )
    })
const removeTodoList = () => {props.removeTodoList(props.todoListID)};

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
                    color = {'secondary'}
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
}
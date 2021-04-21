import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")
    const removeTask = useCallback(() => props.removeTask(props.task.id, props.todoListID),
        [props.removeTask, props.task.id, props.todoListID]);
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    }, [props.changeTaskStatus, props.task.id, props.todoListID])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListID);
    }, [props.changeTaskTitle, props.task.id, props.todoListID])


    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />

            <EditableSpan
                title={props.task.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton size={'small'} onClick={removeTask}>
                <Delete/>
            </IconButton>

        </div>
    )
})
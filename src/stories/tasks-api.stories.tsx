import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/tasks-api";


export default {
    title: 'API-TASKS'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = "71de0f01-887a-4ee4-a67c-225cae16d9af"
        taskAPI.getTasks(todoListID)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todoListID = "a78955dc-3c68-4e99-be2f-e377362642e7"
    useEffect(() => {
        const title = "444"
        taskAPI.createTask(todoListID, title)
            .then((res) => {
                setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = "71de0f01-887a-4ee4-a67c-225cae16d9af"
        const taskID = "1b66eb81-d9a3-4c90-bdbb-39a6f1268f61"
        taskAPI.deleteTask(todoListID,taskID)
            .then((res) => {setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = "71de0f01-887a-4ee4-a67c-225cae16d9af";
        const  title = "UpdateTitle"
        const taskID = "38870abd-465a-415a-87cd-872a9f755b5d"
        taskAPI.updateTask(todoListID, taskID, title)
            .then((res) => {setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div> }
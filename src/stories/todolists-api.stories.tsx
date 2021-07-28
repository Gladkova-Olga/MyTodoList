import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API-TODOLISTS'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "111"
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = "7d698664-15f9-4dcb-bcdd-a37695f1889e"
        todolistAPI.deleteTodo(todoListID)
            .then((res) => {setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div> }

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = "71de0f01-887a-4ee4-a67c-225cae16d9af";
        const  title = "Redux"
        todolistAPI.updateTodo(todoListID, title)
            .then((res) => {setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div> }
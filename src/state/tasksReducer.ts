import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListReducer";

export type RemoveTaskACType = {
    type: "REMOVE-TASK",
    id: string
    todoListID: string
}
export type AddTaskACType = {
    type: "ADD-TASK",
    title: string
    todoListID: string
}

export type ChangeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS",
    id: string
    isDone: boolean
    todoListID: string
}

export type ChangeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE",
    id: string
    title: string
    todoListID: string
}

export type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType
| AddTodoListActionType | RemoveTodoListActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.todoListID] = copyState[action.todoListID].filter(t => t.id !== action.id);
            return copyState;
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        }
        case "CHANGE-TASK-STATUS": {
            let copyState = {...state};
            let task = copyState[action.todoListID].find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            let copyState = {...state};
            let task = copyState[action.todoListID].find(t => t.id === action.id);
            if (task) {
                task.title = action.title;
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoListID]: []}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state};
            delete copyState[action.id]
            return copyState
        }


        default:
            return state;

    }

}

export const removeTaskAC = (id: string, todoListID: string): RemoveTaskACType => {
    return {type: "REMOVE-TASK", id, todoListID};
}

export const addTaskAC = (title: string, todoListID: string): AddTaskACType => {
    return {type: "ADD-TASK", title, todoListID};
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): ChangeTaskStatusACType => {
    return {type: "CHANGE-TASK-STATUS", id, isDone, todoListID};
}
export const changeTaskTitleAC = (id: string, title: string, todoListID: string): ChangeTaskTitleACType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todoListID};
}

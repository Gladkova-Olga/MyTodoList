import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

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


export type ActionsType = RemoveTaskACType | AddTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state};
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t => t.id !== action.id);
            return stateCopy;
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID] : [newTask, ...state[action.todoListID]]}
        }


        default:
            return state;

    }

}

export const removeTaskAC = (id: string, todoListID: string):RemoveTaskACType  => {
    return {type: "REMOVE-TASK", id, todoListID};
}

export const addTaskAC = (title: string, todoListID: string):AddTaskACType  => {
    return {type: "ADD-TASK", title, todoListID};
}
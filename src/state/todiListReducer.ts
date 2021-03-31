import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string

}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string

}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValueType
    id: string

}


export const TodoListReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListID: string = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
            }
            return [newTodoList, ...todoLists];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...todoLists]
            }
           return todoLists
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.value;
               return [...todoLists];
            }
            return todoLists
        }
        default:
            return todoLists


    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }

}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title
    }
}

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        id
    }
}

export const changeTodoListFilterAC = (value: FilterValueType, id: string): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        value,
        id
    }
}
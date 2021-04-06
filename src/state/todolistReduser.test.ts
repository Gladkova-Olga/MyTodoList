import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todiListReducer";


test('correct removing of todoList', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1));
    expect(endState.length).toBe(1)
    expect(endState[0].id === todolistId2)
})

test('correct addition of todoList', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newTodoListTitle = "New Todolist";

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle));
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
})

test('correct changing of todoLists title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newTodoListTitle = "New Todolist";
    const endState = todoListsReducer(startState, changeTodoListTitleAC(newTodoListTitle, todolistId1));

    expect(endState[0].title).toBe("New Todolist")
    expect(endState[1].title).toBe("What to buy")

})

test('correct changing of todoLists filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newTodoListFilter: FilterValueType = 'active';

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newTodoListFilter, todolistId1));
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')

})
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1'
    }
})
type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type CommonTodoResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}


export const todolistAPI = {
    getTodos()  {
        return instance.get<Array<TodoType>>('todo-lists');
    },
    createTodo(title: string) {
        return instance.post<CommonTodoResponseType<{item: TodoType}>>('todo-lists', {title});
    },
    deleteTodo(todoListID: string) {
        return instance.delete<CommonTodoResponseType>(`todo-lists/${todoListID}`);
    },
    updateTodo(todoListID: string, title: string) {
        return instance.put<CommonTodoResponseType>(`todo-lists/${todoListID}`,{title})
    }
}
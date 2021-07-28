import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1'
    }
})
type TaskType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type CommonTaskResponseType<T = null> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}


export const taskAPI = {
    getTasks(todoListID: string)  {
        return instance.get<Array<TaskType>>(`todo-lists/${todoListID}/tasks`);
    },
    createTask(todoListID: string, title: string) {
        return instance.post<CommonTaskResponseType<TaskType>>(`todo-lists/${todoListID}/tasks`, {title});
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<CommonTaskResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    },
    updateTask(todoListID: string, taskID: string, title: string) {
        return instance.put<CommonTaskResponseType<TaskType>>(`todo-lists/${todoListID}/tasks/${taskID}`,{title})
    }
}




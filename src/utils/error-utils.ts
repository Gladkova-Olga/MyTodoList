import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export type ErrorActionType = SetAppStatusType | SetAppErrorType

export const  handleServerNetworkError= (dispatch: Dispatch<ErrorActionType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorActionType>) => {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            dispatch(setAppErrorAC("some error"))
        }
        dispatch(setAppStatusAC("failed"))
    }

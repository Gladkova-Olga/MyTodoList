import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    console.log('Editable span ')
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onEnter =  (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setEditMode(false);
            props.changeTitle(title);
        }


    }

    return (
        editMode ?
            <TextField
                value={title}
                autoFocus
                onBlur={activateViewMode}
                onChange={changeTitle}
                onKeyPress={onEnter}
            /> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan;
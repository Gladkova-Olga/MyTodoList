import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void


}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let trimmedItem = title.trim();
        if (trimmedItem) {
            props.addItem(trimmedItem)

        } else {
            setError('Title is required')
        }
        setTitle('');
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle((e.currentTarget.value))
        setError(null)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    };

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                helperText={error}
            />

            <IconButton size={'small'} color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>
    )
}

export default AddItemForm;
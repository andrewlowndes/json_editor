import React, { CSSProperties, useEffect, useReducer } from 'react';
import { JSONArray, JSONType } from '../../interfaces/JSONType';
import { ArrayActions, arrayReducer } from '../../reducers/arrayReducer';
import { valueToString } from '../../utils/valueToString';
import { Button } from '../common/Button';
import { Clickable } from '../common/Clickable';

const arrayEditorStyle: CSSProperties = {
    border: '1px solid #CCC',
    overflow: 'auto',
    height: 200,
    resize: 'vertical'
};

const itemStyle: CSSProperties = {
    padding: 10,
    borderBottom: '1px solid #CCC',
    backgroundColor: 'white',
    cursor: 'pointer'
};

const itemHoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
};

const addButtonStyle: CSSProperties = {
    marginTop: 10
};

export interface ArrayEditorProps {
    value: JSONArray;
    onEdit: (index: number) => void;
    onChange: (newValue: JSONArray) => void;
    newItemValue: () => JSONType;
    style?: CSSProperties
}

export function ArrayEditor(props: ArrayEditorProps) {
    const [obj, dispatch] = useReducer(arrayReducer, props.value);

    useEffect(() => {
        props.onChange(obj);
    }, [obj]);

    useEffect(() => {
        dispatch({ action: ArrayActions.SET, value: props.value });
    }, [props.value]);

    const onAdd = () => {
        const newIndex = obj.length;
        dispatch({ action: ArrayActions.ADD_ITEM, value: props.newItemValue() });
        props.onEdit(newIndex);
    };
    
    return (
        <>
            <div style={{ ...arrayEditorStyle, ...props.style }}>
                {
                    obj.map((value, index) => (
                        <Clickable 
                            style={itemStyle}
                            focusStyle={itemHoverStyle}
                            hoverStyle={itemHoverStyle}
                            key={index} 
                            onClick={() => props.onEdit(index)}
                        >
                            {valueToString(value)}
                        </Clickable>
                    ))
                }
            </div>

            <Button type="blue" style={addButtonStyle} onClick={onAdd}>Add new</Button>
        </>
     );
};

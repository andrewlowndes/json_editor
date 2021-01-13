import React, { CSSProperties, useEffect, useReducer } from 'react';
import { JSONObject, JSONType } from '../../interfaces/JSONType';
import { ObjectActions, objectReducer } from '../../reducers/objectReducer';
import { valueToString } from '../../utils/valueToString';
import { Button } from '../common/Button';
import { Clickable } from '../common/Clickable';

const objectEditorStyle: CSSProperties = {
    border: '1px solid #CCC',
    overflow: 'auto',
    height: 200,
    resize: 'vertical'
};

const newPropName = '_new';

const itemStyle: CSSProperties = {
    display: 'flex',
    padding: 10,
    borderBottom: '1px solid #CCC',
    backgroundColor: 'white',
    cursor: 'pointer'
};

const itemHoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
}

const propKeyStyle: CSSProperties = {
    width: '50%',
    fontWeight: 'bold'
};

const propValueStyle: CSSProperties = {
    width: '50%'
};

const addButtonStyle: CSSProperties = {
    marginTop: 10
};

export interface ObjectEditorProps {
    value: JSONObject;
    onEdit: (propName: string) => void;
    onChange: (newValue: JSONObject) => void;
    newItemValue: () => JSONType;
    style?: CSSProperties;
}

export function ObjectEditor(props: ObjectEditorProps) {
    const [obj, dispatch] = useReducer(objectReducer, props.value);

    useEffect(() => {
        console.log('updated', obj);
        props.onChange(obj);
    }, [obj]);

    useEffect(() => {
        dispatch({ action: ObjectActions.SET, value: props.value });
    }, [props.value]);

    const onAdd = () => {
        dispatch({ action: ObjectActions.ADD_ITEM, key: newPropName, value: props.newItemValue() });
        //props.onEdit(newPropName);
    };
    
    return (
        <>
            <div style={{ ...objectEditorStyle, ...props.style }}>
                {
                    Object.keys(obj).map((key) => (
                        <Clickable 
                            style={itemStyle}
                            focusStyle={itemHoverStyle}
                            hoverStyle={itemHoverStyle}
                            key={key} 
                            onClick={() => props.onEdit(key)}
                        >
                            <span style={propKeyStyle}>{key}</span>
                            <span style={propValueStyle}>{valueToString(obj[key])}</span>
                        </Clickable>
                    ))
                }
            </div>

            <Button type="blue" style={addButtonStyle} onClick={onAdd}>Add new</Button>
        </>
     );
};

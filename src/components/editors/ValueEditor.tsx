import React, { CSSProperties } from 'react';

import { JSONArray, JSONObject, JSONType } from '../../interfaces/JSONType';
import { typeFromValue } from "../../utils/typeFromValue";
import { valueFromType } from "../../utils/valueFromType";
import { TextDropdown } from '../inputs/TextDropdown';
import { Label } from '../common/Label';
import { ArrayEditor } from './ArrayEditor';
import { BooleanEditor } from './BooleanEditor';
import { NumberEditor } from './NumberEditor';
import { ObjectEditor } from './ObjectEditor';
import { StringEditor } from './StringEditor';

interface TypeItem {
    name: string;
    value: string;
}

const types: Array<TypeItem> = [
    { name: 'Number', value: 'number' },
    { name: 'Text', value: 'string' },
    { name: 'True / False', value: 'boolean' },
    { name: 'List', value: 'array' },
    { name: 'Record', value: 'object' },
    { name: 'None', value: 'null' }
];

const typeByValue = types.reduce((acc, item) => {
    acc[item.value] = item;
    return acc;
}, {} as Record<string, TypeItem>);

const typeToString = (item: TypeItem | undefined) => {
    return item?.name ?? '';
};

const labelStyle: CSSProperties = {
    marginTop: 20
};

const growStyle: CSSProperties = {
    flexGrow: 1
};

export interface ValueEditorProps {
    value: JSONType;
    onChange: (newValue: JSONType) => void;
    onEdit: (index: string | number) => void;
}

export const ValueEditor = (props: ValueEditorProps) => {
    const updateValue = (type: string) => {
        props.onChange(valueFromType(type));
    };

    const valueType = typeFromValue(props.value);
    
    const valueEditor = (() => {
        switch (valueType) {
            case 'number':
                return (
                    <div style={growStyle}>
                        <Label style={labelStyle}>Value</Label>
                        <NumberEditor value={props.value as number} onChange={props.onChange}></NumberEditor>
                    </div>
                );
            case 'string':
                return (
                    <div style={growStyle}>
                        <Label style={labelStyle}>Value</Label>
                        <StringEditor value={props.value as string} onChange={props.onChange}></StringEditor>
                    </div>
                );
            case 'boolean':
                return (
                    <div style={growStyle}>
                        <Label style={labelStyle}>Value</Label>
                        <BooleanEditor value={props.value as boolean} onChange={props.onChange}></BooleanEditor>
                    </div>
                );
            case 'array':
                return (
                    <>
                        <Label style={labelStyle}>Items ({(props.value as JSONArray).length})</Label>
                        <ArrayEditor 
                            newItemValue={() => `Item ${(props.value as JSONArray).length+1}`} 
                            onEdit={props.onEdit} 
                            value={props.value as Array<JSONType>} 
                            onChange={props.onChange}
                            style={growStyle}
                        ></ArrayEditor>
                    </>
                );
            case 'object':
                return (
                    <>
                        <Label style={labelStyle}>Properties ({Object.keys(props.value as JSONObject).length})</Label>
                        <ObjectEditor 
                            newItemValue={() => ''} 
                            value={props.value as JSONObject} 
                            onEdit={props.onEdit} 
                            onChange={props.onChange}
                            style={growStyle}
                        ></ObjectEditor>
                    </>
                );
            default: 
                return <></>;
        }
    })();

    return (
        <>
            <Label>Type</Label>
            <TextDropdown 
                items={types} 
                textFunc={typeToString} 
                selected={typeByValue[valueType]} 
                onChange={(newItem) => updateValue(newItem.value)}
            ></TextDropdown>
            
            {valueEditor}
        </>
    );
};

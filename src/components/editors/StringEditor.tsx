import React from 'react';
import { TextInput } from '../inputs/TextInput';

export interface StringEditorProps {
    value: string;
    onChange: (newValue: string) => void;
}

export const StringEditor = (props: StringEditorProps) => {
    return <TextInput value={props.value} onChange={props.onChange} />;
};

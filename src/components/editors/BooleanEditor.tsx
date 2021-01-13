import React from 'react';
import { TextDropdown } from '../inputs/TextDropdown';

export interface BooleanEditorProps {
    value: boolean;
    onChange: (newValue: boolean) => void;
}

const boolItems = [true, false];

const boolTextFunc = (item: boolean | undefined) => {
    switch (item) {
        case true: return 'True';
        case false: return 'False';
        default: return '';
    }
};

export const BooleanEditor = (props: BooleanEditorProps) => {
    return <TextDropdown selected={props.value} onChange={props.onChange} items={boolItems} textFunc={boolTextFunc} />;
};

import React from 'react';
import { JSONType } from '../interfaces/JSONType';

export interface ViewerProps {
    value: JSONType;
}

export const Viewer = (props: ViewerProps) => {
    return <pre>{JSON.stringify(props.value, null, '    ')}</pre>;
};

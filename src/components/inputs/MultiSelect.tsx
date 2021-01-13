import React, { CSSProperties } from 'react';
import { Revealer } from '../common/Revealer';
import { Button } from '../common/Button';

export interface MultiSelectProps<T = any> {
    items: Array<T>
    itemRender?: (item: T) => JSX.Element;
    onRemove?: (index: number) => void;
    onSelect?: (index: number) => void;
}

const listStyle: CSSProperties = {
    minHeight: '1.7em',
    border: '1px solid #CCC',
    resize: 'vertical',
    overflow: 'auto',
    appearance: 'listbox'
};

const itemStyle: CSSProperties = {
    display: 'inline-block',
    padding: '2px 5px',
    margin: 1
};

const itemButtonStyle: CSSProperties = {
    width: 'auto',
    display: 'inline-block'
};

const defaultItemRender = (item: any) => {
    return item?.toString() || '';
};

export const MultiSelect = (props: MultiSelectProps) => {
    const itemRender = props.itemRender ?? defaultItemRender;

    return (
        <div style={listStyle}>
            {props.items.map((item, index) => (
                <div key={index} style={itemStyle}>
                    <Button style={itemButtonStyle} onClick={() => props.onSelect?.(index)}>{itemRender(item)}</Button>
                    <Revealer condition={props.onRemove}>
                        <Button style={itemButtonStyle} onClick={() => props.onRemove?.(index)}>x</Button>
                    </Revealer>
                </div>
            ))}
        </div>
    );
};

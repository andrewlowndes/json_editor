import React, { CSSProperties, PropsWithChildren } from "react";
import { Clickable } from './Clickable';

type ButtonType = 'normal' | 'green' | 'blue' | 'red';

export interface ButtonProps {
    type?: ButtonType;
    disabled?: boolean;
    autofocus?: boolean;
    style?: CSSProperties,
    onClick?: () => void;
}

const buttonStyle: CSSProperties = {
    textAlign: 'center',
    boxSizing: 'border-box',
    width: '100%',
    padding: 10,
    margin: 0,
    appearance: 'none',
    outline: 'none',
    border: '1px solid black',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'box-shadow 0.3s, background-color 0.3s',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none'
};

const typeSyle: Record<ButtonType, CSSProperties> = {
    normal: {
        color: '#444',
        borderColor: '#444'
    },
    green: {
        color: '#008C23',
        borderColor: '#008C23'
    },
    blue: {
        color: '#0040FF',
        borderColor: '#0040FF'
    },
    red: {
        color: '#D90000',
        borderColor: '#D90000'
    }
};

const focusStyle: CSSProperties = {
    boxShadow: '1px 1px 1px #CCC'
};

const hoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
};

const downStyle: CSSProperties = {
    boxShadow: '1px 1px 3px #CCC inset',
    backgroundColor: '#DDD'
};

const disabledStyle: CSSProperties = {
    backgroundColor: '#DDD',
    color: '#AAA',
    cursor: 'default'
};

const defaultProps: Partial<ButtonProps> = {
    type: 'normal'
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    props = { ...defaultProps, ...props };

    return (
        <Clickable
            autofocus={props.autofocus}
            disabled={props.disabled}
            onClick={props.onClick}
            style={{ ...buttonStyle, ...typeSyle[props.type!], ...props.style }}
            focusStyle={focusStyle}
            hoverStyle={hoverStyle}
            downStyle={downStyle}
            disabledStyle={disabledStyle}
        >{props.children}</Clickable>
    );
};

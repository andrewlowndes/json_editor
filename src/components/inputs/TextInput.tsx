import React, { CSSProperties, useState } from "react";

type InputType = 'text' | 'number';

export interface TextInputProps {
    type?: InputType;
    disabled?: boolean;
    autofocus?: boolean;
    style?: CSSProperties,
    onChange?: (newText: string) => void;
    value?: string;
}

const inputStyle: CSSProperties = {
    minHeight: '1.7em',
    textAlign: 'left',
    boxSizing: 'border-box',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    appearance: 'none',
    outline: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: '1px solid black',
    backgroundColor: 'white',
    cursor: 'text',
    transition: 'box-shadow 0.3s, background-color 0.3s',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    fontSize: '100%'
};

const hoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
};

const disabledStyle: CSSProperties = {
    backgroundColor: '#DDD',
    color: '#AAA',
    cursor: 'default'
};

const defaultProps: Partial<TextInputProps> = {
    type: 'text'
};

export const TextInput = (props: TextInputProps) => {
    props = { ...defaultProps, ...props };
    
    const [isHovered, setHover] = useState(false);
    const [isFocused, setFocus] = useState(false);
    
    return (
        <input
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
            type={props.type}
            autoFocus={props.autofocus}
            disabled={props.disabled}
            style={{
                ...inputStyle,
                ...props.style,
                ...((isFocused || isHovered) ? hoverStyle : {}),
                ...(props.disabled ? disabledStyle : {})
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onInput={(e) => props.onChange?.((e.target as HTMLInputElement).value)}
            value={props.value}
        />
    );
};

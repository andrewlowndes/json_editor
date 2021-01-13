import React, { CSSProperties, useEffect, useState } from "react";
import { JSONType } from "../../interfaces/JSONType";

const textStyle: CSSProperties = {
    border: '1px solid #CCC',
    margin: 0,
    appearance: 'none',
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'none',
    padding: 10
};

const validStyle: CSSProperties = {
    borderColor: 'green'
};

const invalidStyle: CSSProperties = {
    borderColor: 'red'
};

export interface JSONTextEditorProps {
    value: JSONType;
    style?: CSSProperties;
    onChange?: (val: JSONType) => void;
}

export const JSONTextEditor = (props: JSONTextEditorProps) => {
    const [textareaValue, setTextareaValue] = useState(JSON.stringify(props.value, null, '    '));
    const [isValid, setIsValid] = useState(true);

    const updateValue = (newValue: string) => {
        setTextareaValue(newValue);

        try {
            const parsedResult = JSON.parse(newValue);
            props.onChange?.(parsedResult);
            setIsValid(true);
        } catch (err) {
            setIsValid(false);
        }
    };

    useEffect(() => {
        setTextareaValue(JSON.stringify(props.value, null, '    '));
        setIsValid(true);
    }, [props.value]);

    return (
        <textarea 
            autoCorrect="off" 
            spellCheck="false" 
            autoComplete="off" 
            style={{
                ...textStyle,
                ...props.style, 
                ...(isValid ? validStyle : invalidStyle)
            }} 
            onChange={(e) => updateValue((e.target as HTMLTextAreaElement).value)} 
            value={textareaValue}
        ></textarea>
    );
};

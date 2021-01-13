import React, { useEffect, useState } from "react";
import { TextInput } from "../inputs/TextInput";

export interface NumberEditorProps {
    value: number;
    onChange: (newValue: number) => void;
}

export const NumberEditor = (props: NumberEditorProps) => {
    const [inputValue, setInputValue] = useState(props.value.toString());

    useEffect(() => {
        setInputValue(props.value.toString());
    }, [props.value]);

    const updateValue = (newInputValue: string) => {
        setInputValue(newInputValue);

        const newValue = parseFloat(newInputValue);

        if (!isNaN(newValue) && isFinite(newValue)) {
            props.onChange(newValue);
        }
    };

    return <TextInput type="number" value={inputValue} onChange={updateValue} />;
};

import React, { CSSProperties, PropsWithChildren } from "react";

const labelStyle: CSSProperties = {
    display: 'block',
    marginTop: 10,
    marginBottom: 5,
    fontSize: '90%',
    color: '#777'
};

export interface LabelProps {
    style?: CSSProperties;
}

export const Label = (props: PropsWithChildren<LabelProps>) => {
    return (
        <label style={{ ...labelStyle, ...props.style }}>{props.children}</label>
    );
};

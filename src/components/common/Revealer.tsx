import React, { PropsWithChildren } from "react";

export interface RevealerProps {
    condition?: any;
}

export const Revealer = (props: PropsWithChildren<RevealerProps>) => {
    return <>{ props.condition ? props.children : undefined }</>;
};

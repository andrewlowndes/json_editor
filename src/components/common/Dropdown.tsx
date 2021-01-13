import React, { CSSProperties, PropsWithChildren, RefObject, useEffect, useRef } from "react";
import { Revealer } from "./Revealer";

const dropdownStyle: CSSProperties = {
    position: 'absolute'
};

export interface DropdownProps {
    style?: CSSProperties;
    open: boolean;
    clickIgnoreElement?: RefObject<Element>,
    onClickOutside: () => void;
}

export const Dropdown = (props: PropsWithChildren<DropdownProps>) => {
    const element = useRef<HTMLDivElement>(null);

    const handleClick = (e: Event) => {
        if (
            element.current && 
            element.current !== e.target && 
            !element.current!.contains(e.target as Node) &&
            (!props.clickIgnoreElement?.current || (
                props.clickIgnoreElement?.current !== e.target && 
                !props.clickIgnoreElement?.current!.contains(e.target as Node)
            ))
        ) {
            props.onClickOutside();
        }
    };

    useEffect(() => {
        if (props.open) {
            document.addEventListener("touchstart", handleClick);
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("touchstart", handleClick);
            document.removeEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("touchstart", handleClick);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [props.open]);

    return (
        <Revealer condition={props.open}>
            <div ref={element} style={{ ...dropdownStyle, ...props.style }}>
                {props.children}
            </div>
        </Revealer>
    );
};

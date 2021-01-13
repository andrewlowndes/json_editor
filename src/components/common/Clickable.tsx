import React, { CSSProperties, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../providers/AppContext";

export interface ClickableProps {
    autofocus?: boolean;
    disabled?: boolean;
    style?: CSSProperties,
    focusStyle?: CSSProperties,
    hoverStyle?: CSSProperties,
    downStyle?: CSSProperties,
    disabledStyle?: CSSProperties,
    onClick?: () => void;
}

const enterKey = 'Enter';

export const Clickable = (props: PropsWithChildren<ClickableProps>) => {
    const [isHovered, setHover] = useState(false);
    const [isFocused, setFocus] = useState(false);
    const [isDown, setDown] = useState(false);
    const [isClicked, setClicked] = useState(false);
    
    const element = useRef<HTMLDivElement>(null);
    const { mouse } = useContext(AppContext);
    
    useEffect(() => {
        if (isDown && !mouse.down) {
            setClicked(true);
        }
    }, [mouse.down]);

    useEffect(() => {
        if (isClicked) {
            props.onClick?.();
            setDown(false);
            setClicked(false);
        }
    }, [isClicked]);

    useEffect(() => {
        if (props.autofocus) {
            element.current?.focus();
        }
    }, []);
    

    return (
        props.disabled ? (
            <div
                style={{
                    ...props.style,
                    ...props.disabledStyle
                }}
            >{props.children}</div>
        ) : (
            <div
                ref={element}
                tabIndex={0}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={() => setDown(true)}
                onKeyDown={(e) => e.key === enterKey ? setDown(true) : undefined}
                onKeyUp={(e) => e.key === enterKey ? setClicked(true) : undefined}
                onTouchStart={() => setDown(true)}
                onTouchCancel={() => setDown(false)}
                onTouchEnd={() => setClicked(true)}
                style={{
                    ...props.style,
                    ...(isFocused ? props.focusStyle : {}),
                    ...(isHovered ? props.hoverStyle : {}),
                    ...(isDown ? props.downStyle : {})
                }}
            >{props.children}</div>
        )
    );
};

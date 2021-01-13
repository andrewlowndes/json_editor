import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getElementOffset } from '../../utils/getElementOffset';
import { Clickable } from '../common/Clickable';
import { Dropdown } from "../common/Dropdown";

function strigifyItem <T = any>(item: T) {
    return '' + (item ?? '');
}

const buttonStyle: CSSProperties = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2030%2010%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M%200%200.6522%20L%208.0952%2010%20L%2017%200.6522%20L%2016.3787%200%20L%208.0952%208.7536%20L%200.5167%200.0555%20L%200%200.6522%20Z%22%20%2F%3E%3C%2Fsvg%3E")',
    backgroundSize: 'auto 20%',
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: '1px solid black',
    textAlign: 'left',
    boxSizing: 'border-box',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    appearance: 'none',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s, background-color 0.3s',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none'
};

const buttonHoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
};

const buttonOpenStyle: CSSProperties = {
    backgroundImage: 'url("data:image/svg+xml,%3Csvg%20viewBox%3D%22-4%203%2030%2010%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M%2013.5%2012.8478%20L%205.4048%203.5%20L%20-3.5%2012.8478%20L%20-2.8787%2013.5%20L%205.4048%204.7464%20L%2012.9833%2013.4445%20L%2013.5%2012.8478%20Z%22%20%2F%3E%3C%2Fsvg%3E")',
};

const mainStyle: CSSProperties = {
    position: 'relative'
};

const dropdownStyle: CSSProperties = {
    width: '100%',
    backgroundColor: 'white',
    maxHeight: 200,
    overflow: 'auto',
    border: '1px solid #888',
    borderRadius: '3px'
};

const itemStyle: CSSProperties = {
    textAlign: 'center',
    boxSizing: 'border-box',
    width: '100%',
    padding: 10,
    margin: 0,
    outline: 'none',
    borderTop: '1px solid #CCC',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s, background-color 0.3s',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none'
};

const itemFocusStyle: CSSProperties = {
    boxShadow: '1px 1px 1px #CCC'
};

const itemHoverStyle: CSSProperties = {
    backgroundColor: '#F5F5F5'
};

const itemDownStyle: CSSProperties = {
    boxShadow: '1px 1px 3px #CCC inset',
    backgroundColor: '#DDD'
};

const selectedItemStyle: CSSProperties = {
    fontWeight: 'bold'
};

export interface TextDropdownProps<T = any> {
    selected?: T;
    items: Array<T>;
    textFunc?: (item: T | undefined) => string;
    onChange?: (item: T) => void;
    portal?: Element;
}

export function TextDropdown<T>(props: TextDropdownProps<T>) {
    const [selected, setSelected] = useState(props.selected);
    const [isOpen, setOpen] = useState(false);
    const wrapElement = useRef<HTMLDivElement>(null);

    const textFunc = props.textFunc ?? strigifyItem;

    const selectItem = (item: T) => {
        setOpen(false);

        if (selected !== item) {
            setSelected(item);
            props.onChange?.(item);
        }
    };

    const [dropStyle, setDropStyle] = useState(dropdownStyle);

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);

    useLayoutEffect(() => {
        const pos = getElementOffset(wrapElement.current!);

        setDropStyle({
            ...dropdownStyle,
            width: wrapElement.current?.clientWidth, 
            top: pos.top + (wrapElement.current?.clientHeight ?? 0), 
            left: pos.left
        });
    }, [isOpen]);

    return (
        <div style={mainStyle} ref={wrapElement}>
            <Clickable 
                style={{ ...buttonStyle, ...(isOpen ? buttonOpenStyle : {})}}
                hoverStyle={buttonHoverStyle}
                focusStyle={buttonHoverStyle} 
                onClick={() => setOpen(!isOpen)}
            >{textFunc(selected)}</Clickable>

            {
                createPortal(
                    <Dropdown 
                        style={dropStyle}
                        open={isOpen}
                        clickIgnoreElement={wrapElement}
                        onClickOutside={() => setOpen(false)}
                    >
                    {
                        props.items.map((item, index) => {
                            let style = itemStyle;

                            if (selected === item) {
                                style = { ...style, ...selectedItemStyle };
                            }

                            return (
                                <Clickable 
                                    key={index}
                                    style={style}
                                    focusStyle={itemFocusStyle}
                                    hoverStyle={itemHoverStyle}
                                    downStyle={itemDownStyle}
                                    onClick={() => selectItem(item)}
                                >{textFunc(item)}</Clickable>
                            );
                        })
                    }
                    </Dropdown>
                , props.portal ?? document.body)
                }
        </div>
    );
};

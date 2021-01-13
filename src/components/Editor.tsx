import React, { CSSProperties, useEffect, useState } from 'react';

import { JSONType } from '../interfaces/JSONType';
import { deleteChild } from '../utils/deleteChild';
import { getChild } from '../utils/getChild';
import { setChild } from '../utils/setChild';
import { Button } from './common/Button';
import { Clickable } from './common/Clickable';
import { Label } from './common/Label';
import { Revealer } from './common/Revealer';
import { ValueEditor } from './editors/ValueEditor';
import { TextInput } from './inputs/TextInput';

export interface EditorProps {
    value: JSONType;
    onChange: (newValue: JSONType) => void;
    style?: CSSProperties;
}

const editorStyle: CSSProperties = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 0px 6px #AAA'
};

const valueEditStyle: CSSProperties = {
    padding: 20,
    flexShrink: 0,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
};

const breadcrumbsStyle: CSSProperties = {
    borderBottom: '1px solid #AAA',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    padding: 5,
    flexShrink: 0,
    scrollSnapType: 'x mandatory'
};

const breakcrumbFirstItemStyle: CSSProperties = {
    display: 'inline-block',
    backgroundColor: 'white',
    padding: 10,
    cursor: 'pointer',
    width: 'auto',
    outline: 'none',
    border: 'none',
    verticalAlign: 'middle',
    scrollSnapAlign: 'end'
};

const breakcrumbItemStyle: CSSProperties = {
    ...breakcrumbFirstItemStyle,
    borderLeft: '1px solid #CCC'
};

const breakcrumbItemHoverStyle: CSSProperties = {
    backgroundColor: '#E5E5E5',
};

const propNameStyle: CSSProperties = {
    display: 'flex',
    marginBottom: 10
};

const propNameInputStyle: CSSProperties = {
    flexGrow: 1
};

const propNameButtonStyle: CSSProperties = {
    flexShrink: 0,
    marginLeft: 10,
    width: 'auto'
};

const deleteButtonStyle: CSSProperties = {
    marginTop: 10
};

export const Editor = (props: EditorProps) => {
    const [path, setPath] = useState<Array<string | number>>([]);
    const [obj, setObj] = useState(props.value);

    const [propName, setPropName] = useState(path[path.length - 1] ?? '');

    useEffect(() => {
        setPropName(path[path.length - 1]);
    }, [path]);

    const updatePropName = () => {
        const newPath = [ ...path.slice(0, path.length-1), propName];
        const existingItem = getChild(obj, path);
        let newObj = deleteChild(obj, path);
        newObj = setChild(newObj, newPath, existingItem);
        setObj(newObj);
        setPath(newPath);
        props.onChange(newObj);
    };

    const updateObj = (subobj: JSONType) => {
        const newObj = setChild(obj, path, subobj);
        setObj(newObj);
        props.onChange(newObj);
    };

    const deleteCurrent = () => {
        const newObj = deleteChild(obj, path);
        setObj(newObj);
        setPath(path.slice(0, path.length-1));
        props.onChange(newObj);
    };

    useEffect(() => {
        setObj(props.value);
    }, [props.value]);

    return (
        <div style={{ ...editorStyle, ...props.style }}>
            <div style={breadcrumbsStyle}>
                <Clickable 
                    style={breakcrumbFirstItemStyle}
                    hoverStyle={breakcrumbItemHoverStyle}
                    focusStyle={breakcrumbItemHoverStyle}
                    onClick={() => setPath([])}
                >Root</Clickable>
                {
                    path.map((pathItem, pathIndex) => (
                        <Clickable
                            style={breakcrumbItemStyle}
                            hoverStyle={breakcrumbItemHoverStyle}
                            focusStyle={breakcrumbItemHoverStyle}
                            key={pathIndex}
                            onClick={() => setPath(path.slice(0, pathIndex+1))}
                        >{pathItem}</Clickable>
                    ))
                }
            </div>

            <div style={valueEditStyle}>
                <Revealer condition={path.length > 0 && typeof path[path.length - 1] === 'string'}>
                    <Label>Property Name</Label>

                    <div style={propNameStyle}>
                        <TextInput style={propNameInputStyle} value={'' + propName} onChange={setPropName} />
                        <Button type="green" style={propNameButtonStyle} onClick={updatePropName}>Change</Button>
                    </div>
                </Revealer>

                <ValueEditor
                    value={getChild(obj, path)}
                    onEdit={(index) => setPath([...path, index])}
                    onChange={(newValue) => updateObj(newValue)}
                />

                <Revealer condition={path.length > 0}>
                    <Button style={deleteButtonStyle} type="red" onClick={deleteCurrent}>Delete</Button>
                </Revealer>
            </div>
        </div>
    );
};

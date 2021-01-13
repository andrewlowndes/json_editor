import React, { CSSProperties, useState } from 'react';
import { render } from 'react-dom';

import { Editor } from './components/Editor';
import { JSONTextEditor } from './components/editors/JSONTextEditor';
import { useMouse } from './hooks/useMouse';
import { JSONType } from './interfaces/JSONType';
import { AppContext } from './providers/AppContext';

const exampleJson = {};

const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%'
};

const editorStyle: CSSProperties = {
    minWidth: 300,
    maxWidth: 700,
    flexBasis: '50%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'auto'
};

const viewerStyle: CSSProperties = {
    minWidth: 300,
    minHeight: 600,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
    whiteSpace: 'nowrap',
    overflow: 'auto'
};

const Manager = () => {
    const [data, setData] = useState<JSONType>(exampleJson);
    const mouse = useMouse();

    return (
        <AppContext.Provider value={{ mouse }}>
            <div style={style}>
                <Editor style={editorStyle} value={data} onChange={(val) => setData(val)}></Editor>
                <JSONTextEditor style={viewerStyle} value={data} onChange={(val) => setData(val)}></JSONTextEditor>
            </div>
        </AppContext.Provider>
    );
}

render((<Manager></Manager>), document.getElementById('app'));

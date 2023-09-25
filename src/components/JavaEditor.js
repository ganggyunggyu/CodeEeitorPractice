/** @format */

import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import SolarizedLigthTheme from 'monaco-themes/themes/Solarized-light.json';
import { useMonaco } from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFile } from '../store';
import LeftBar from './LeftBar';
import { useParams } from 'react-router-dom';

export default function JavaEditor() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const monaco = useMonaco();
  const { fileId } = useParams();

  const files = useSelector((state) => state.files);

  const fileIndex = files.findIndex((el) => {
    return el.fileId === +fileId;
  });
  const file = files[fileIndex];
  console.log(file);

  useEffect(() => {
    if (file === undefined) return;

    setCode(file.code);
  }, [fileId]);

  const [code, setCode] = useState('');

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const showValue = () => {
    console.log(JSON.stringify(editorRef.current.getValue()));
    setCode(code);
    console.log('saveCode:', code);
  };
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: true,
    },
    suggest: {
      // 자동완성 제안
      snippetsPreventQuickSuggestions: false,
      suggestions: [],
    },
  };

  const handleEditorChange = (value, event) => {
    setCode(value);
    console.log('code : ', code);
  };

  useEffect(() => {
    if (monaco) {
      console.log('모나코 인스턴스요', monaco);

      monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);
      monaco.editor.setTheme('solarizedLigth');
    }
  }, [monaco]);
  return (
    <>
      <LeftBar />
      <div style={{ marginLeft: '20vw' }}>
        {/* <button onClick={showValue}>Run</button> */}
        <button
          className='p-2 border'
          onClick={() => {
            dispatch(saveFile({ fileId, code }));
          }}
        >
          Save
        </button>
        <Editor
          height='100vh'
          width='80vw'
          defaultLanguage='java'
          onMount={handleEditorDidMount}
          options={editorOptions}
          onChange={handleEditorChange}
          value={code}
        />
      </div>
    </>
  );
}

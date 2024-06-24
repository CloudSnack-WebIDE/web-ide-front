import React, { useEffect, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import './styles.css';

interface CodeEditorProps {
  roomId: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ roomId, language }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState<string>('');
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const encodedRoomId = encodeURIComponent(roomId);
    const provider = new WebsocketProvider(
      'ws://localhost:5173',
      encodedRoomId,
      ydoc
    );
    ydocRef.current = ydoc;
    providerRef.current = provider;

    return () => {
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomId]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    const model = editor.getModel();
    if (model && ydocRef.current && providerRef.current) {
      const yText = ydocRef.current.getText('monaco');
      new MonacoBinding(
        yText,
        model,
        new Set([editor]),
        providerRef.current.awareness
      );

      editor.updateOptions({
        fontSize: 12,
        lineHeight: 20,
        fontFamily: 'Fira Code, monospace',
      });
    }
  };

  const runJavaScriptCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        const originalConsoleLog = console.log;
        let consoleOutput = '';
        console.log = (...args) => {
          consoleOutput += args.join(' ') + '\n';
          originalConsoleLog.apply(console, args);
        };
        new Function(code)();
        console.log = originalConsoleLog;
        setOutput(consoleOutput !== '' ? consoleOutput : '코드가 성공적으로 실행되었습니다. 결과가 없습니다.'); // 아무 코드도 입력 하지 않았을 때 ㅋ
      } catch (err) {
        setOutput(String(err));
      }
    }
  };

  const runCode = async () => {
    if (language === 'javascript') {
      runJavaScriptCode();
    } else {
      if (editorRef.current) {
        const code = editorRef.current.getValue();
        try {
          const response = await fetch('/compile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ language, code }),
          });
          const result = await response.json();
          setOutput(result.output);
        } catch (err) {
          setOutput(String(err));
        }
      }
    }
  };

  return (
    <div id='code-editor-setup'>
      <div>
        <div id='monaco-editor'>
          <Editor
            height="45vh"
            width="130vh"
            defaultLanguage={language}
            theme="light"
            options={{ selectOnLineNumbers: true, automaticLayout: true }}
            onMount={handleEditorDidMount}/>
          
        </div>
        <div>
          <button className="compiling_box" onClick={runCode}>
            컴파일
          </button>
        </div>

        <div id='ide_out_put'>
          <h3>출력</h3>
          <pre>{output}</pre>
        </div>
        
      </div>
    </div>
  );
};

export default CodeEditor;

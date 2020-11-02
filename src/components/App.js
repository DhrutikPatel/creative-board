import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`<html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `)
    }, 250);

    return () => clearTimeout(timeOut);
  }, [html, css, js]);

  return (
    <React.Fragment>
      <div className="pane top-pane">
        <Editor 
          language="xml"
          editorName="HTML"
          value={html}
          onChange = {setHtml}
        />
        <Editor 
          language="css"
          editorName="CSS"
          value={css}
          onChange = {setCss}
        />
        <Editor 
          language="javascript"
          editorName="JS"
          value={js}
          onChange = {setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </React.Fragment>
  );
}

export default App;

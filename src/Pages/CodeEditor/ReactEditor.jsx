import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import EditorToolbar from "../../Components/CodeEditorComponent/EditorToolbar/EditorToolbar";
import SaveModal from "../../Components/CodeEditorComponent/SaveModal/SaveModal";

import {
    getSnippetById,
    saveSnippet,
    updateSnippet,
} from "../../utils/codeStorage";

import "./CodeEditor.css";

const DEFAULT_REACT = `function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

// Loads React + ReactDOM + Babel standalone from a CDN and transpiles
// the user's JSX component in-browser, then renders it into #root.
const buildRunnerDoc = (userCode) => `
<html>
<head>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 20px; font-family: Inter, sans-serif; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script>
        window.onerror = (msg) => {
            parent.postMessage({ source: "react-editor", type: "error", message: String(msg) }, "*");
        };
    </script>
    <script type="text/babel" data-presets="react">
        try {
            ${userCode}

            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<App />);
        } catch (err) {
            parent.postMessage({ source: "react-editor", type: "error", message: err.message }, "*");
        }
    </script>
</body>
</html>
`;

const ReactEditor = () => {

    const [searchParams] = useSearchParams();
    const loadId = searchParams.get("load");

    const [code, setCode] = useState(DEFAULT_REACT);
    const [runKey, setRunKey] = useState(1);
    const [error, setError] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [activeSnippetId, setActiveSnippetId] = useState(null);
    const [activeTitle, setActiveTitle] = useState("");

    const debounceRef = useRef(null);

    useEffect(() => {
        if (!loadId) return;

        const snippet = getSnippetById(loadId);

        if (snippet && snippet.type === "react") {
            setCode(snippet.data.code ?? DEFAULT_REACT);
            setActiveSnippetId(snippet.id);
            setActiveTitle(snippet.title);
        }
    }, [loadId]);

    // Auto re-render preview after typing pauses
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setError(null);
            setRunKey((k) => k + 1);
        }, 700);

        return () => clearTimeout(debounceRef.current);
    }, [code]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.source !== "react-editor") return;
            if (event.data.type === "error") setError(event.data.message);
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleRun = () => {
        setError(null);
        setRunKey((k) => k + 1);
    };

    const handleReset = () => {
        setCode(DEFAULT_REACT);
        setError(null);
        setActiveSnippetId(null);
        setActiveTitle("");
    };

    const handleSaveConfirm = (title) => {
        if (activeSnippetId) {
            updateSnippet(activeSnippetId, { title, data: { code } });
        } else {
            const created = saveSnippet({
                type: "react",
                title,
                data: { code },
            });
            setActiveSnippetId(created.id);
        }

        setActiveTitle(title);
        setShowSaveModal(false);
    };

    return (
        <div className="code-editor-page">

            <EditorToolbar
                label={activeTitle || "React Editor"}
                onRun={handleRun}
                onSave={() => setShowSaveModal(true)}
                onReset={handleReset}
            />

            <div className="code-editor-body split-3">

                <div className="editor-pane">
                    <div className="editor-pane-tabs">
                        <button className="tab active" type="button">
                            App.jsx
                        </button>
                    </div>

                    <div className="editor-pane-monaco">
                        <Editor
                            height="100%"
                            language="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val ?? "")}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>

                <div className="preview-pane">
                    <div className="preview-pane-header">Preview</div>

                    {error && (
                        <div className="preview-error">{error}</div>
                    )}

                    <iframe
                        key={runKey}
                        title="react-preview"
                        srcDoc={buildRunnerDoc(code)}
                        sandbox="allow-scripts"
                        className="preview-frame"
                    />
                </div>

            </div>

            {showSaveModal && (
                <SaveModal
                    defaultTitle={activeTitle}
                    onCancel={() => setShowSaveModal(false)}
                    onConfirm={handleSaveConfirm}
                />
            )}

        </div>
    );
};

export default ReactEditor;

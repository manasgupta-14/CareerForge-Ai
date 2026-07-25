import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import EditorToolbar from "../../Components/CodeEditorComponent/EditorToolbar/EditorToolbar";
import SaveModal from "../../Components/CodeEditorComponent/SaveModal/SaveModal";
import ConsolePanel from "../../Components/CodeEditorComponent/ConsolePanel/ConsolePanel";

import {
    getSnippetById,
    saveSnippet,
    updateSnippet,
} from "../../utils/codeStorage";

import "./CodeEditor.css";

const DEFAULT_JS = `// Write JavaScript and hit Run
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));

for (let i = 1; i <= 3; i++) {
  console.log("Count:", i);
}`;

// Runs inside the sandboxed iframe. Overrides console methods
// to forward messages to the parent window via postMessage.
const buildRunnerDoc = (userCode) => `
<html>
<body>
<script>
    const send = (type, args) => {
        const message = args
            .map((a) => {
                try {
                    return typeof a === "object" ? JSON.stringify(a) : String(a);
                } catch (e) {
                    return String(a);
                }
            })
            .join(" ");
        parent.postMessage({ source: "js-editor", type, message }, "*");
    };

    console.log = (...args) => send("log", args);
    console.warn = (...args) => send("warn", args);
    console.error = (...args) => send("error", args);

    window.onerror = (msg) => {
        send("error", [msg]);
    };

    try {
        ${userCode}
    } catch (err) {
        send("error", [err.message]);
    }
</script>
</body>
</html>
`;

const JavascriptEditor = () => {

    const [searchParams] = useSearchParams();
    const loadId = searchParams.get("load");

    const [code, setCode] = useState(DEFAULT_JS);
    const [logs, setLogs] = useState([]);
    const [runKey, setRunKey] = useState(0);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [activeSnippetId, setActiveSnippetId] = useState(null);
    const [activeTitle, setActiveTitle] = useState("");

    const iframeRef = useRef(null);

    useEffect(() => {
        if (!loadId) return;

        const snippet = getSnippetById(loadId);

        if (snippet && snippet.type === "javascript") {
            setCode(snippet.data.code ?? DEFAULT_JS);
            setActiveSnippetId(snippet.id);
            setActiveTitle(snippet.title);
        }
    }, [loadId]);

    // Listen for console messages forwarded from the sandboxed iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.source !== "js-editor") return;

            setLogs((prev) => [
                ...prev,
                { type: event.data.type, message: event.data.message },
            ]);
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleRun = useCallback(() => {
        setLogs([]);
        setRunKey((k) => k + 1);
    }, []);

    const handleReset = () => {
        setCode(DEFAULT_JS);
        setLogs([]);
        setActiveSnippetId(null);
        setActiveTitle("");
    };

    const handleSaveConfirm = (title) => {
        if (activeSnippetId) {
            updateSnippet(activeSnippetId, { title, data: { code } });
        } else {
            const created = saveSnippet({
                type: "javascript",
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
                label={activeTitle || "JavaScript Editor"}
                onRun={handleRun}
                onSave={() => setShowSaveModal(true)}
                onReset={handleReset}
            />

            <div className="code-editor-body split-2">

                <div className="editor-pane">
                    <div className="editor-pane-tabs">
                        <button className="tab active" type="button">
                            script.js
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

                <div className="console-pane">
                    <ConsolePanel logs={logs} onClear={() => setLogs([])} />

                    {/* Hidden sandboxed runner, re-mounted on every Run */}
                    <iframe
                        key={runKey}
                        ref={iframeRef}
                        title="js-runner"
                        srcDoc={runKey > 0 ? buildRunnerDoc(code) : ""}
                        sandbox="allow-scripts"
                        style={{ display: "none" }}
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

export default JavascriptEditor;

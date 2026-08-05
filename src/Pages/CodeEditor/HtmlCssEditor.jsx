import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import EditorToolbar from "../../Components/CodeEditorComponent/EditorToolbar/EditorToolbar";
import SaveModal from "../../Components/CodeEditorComponent/SaveModal/SaveModal";
import LoginRequiredModal from "../../Components/Common/LoginRequiredModal";

import { useAuth } from "../../Context/AuthContext";
import {
    getSnippetById,
    saveSnippet,
    updateSnippet,
} from "../../utils/codeStorage";

import "./CodeEditor.css";

const DEFAULT_HTML = `<div class="card">
  <h1>Hello, World!</h1>
  <p>Start editing to see changes live.</p>
</div>`;

const DEFAULT_CSS = `body {
  font-family: Inter, sans-serif;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.card {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  text-align: center;
}

h1 {
  color: #2563eb;
}`;

const HtmlCssEditor = () => {

    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();
    const loadId = searchParams.get("load");

    const [html, setHtml] = useState(DEFAULT_HTML);
    const [css, setCss] = useState(DEFAULT_CSS);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [activeSnippetId, setActiveSnippetId] = useState(null);
    const [activeTitle, setActiveTitle] = useState("");
    const [activeTab, setActiveTab] = useState("html");

    const debounceRef = useRef(null);
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        if (!loadId) return;

        const snippet = getSnippetById(loadId);

        if (snippet && snippet.type === "html-css") {
            setHtml(snippet.data.html ?? DEFAULT_HTML);
            setCss(snippet.data.css ?? DEFAULT_CSS);
            setActiveSnippetId(snippet.id);
            setActiveTitle(snippet.title);
        }
    }, [loadId]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head><style>${css}</style></head>
                    <body>${html}</body>
                </html>
            `);
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [html, css]);

    const handleReset = () => {
        setHtml(DEFAULT_HTML);
        setCss(DEFAULT_CSS);
        setActiveSnippetId(null);
        setActiveTitle("");
    };

    const handleSaveConfirm = (title) => {
        if (activeSnippetId) {
            updateSnippet(activeSnippetId, { title, data: { html, css } });
        } else {
            const created = saveSnippet({
                type: "html-css",
                title,
                data: { html, css },
            });
            setActiveSnippetId(created.id);
        }

        setActiveTitle(title);
        setShowSaveModal(false);
    };

    const handleSaveClick = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        setShowSaveModal(true);
    };

    return (
        <div className="code-editor-page">

            <EditorToolbar
                label={activeTitle || "HTML / CSS Editor"}
                onSave={handleSaveClick}
                onReset={handleReset}
            />

            <div className="code-editor-body split-3">

                <div className="editor-pane">

                    <div className="editor-pane-tabs">
                        <button
                            className={activeTab === "html" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("html")}
                            type="button"
                        >
                            index.html
                        </button>
                        <button
                            className={activeTab === "css" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("css")}
                            type="button"
                        >
                            style.css
                        </button>
                    </div>

                    <div className="editor-pane-monaco">
                        {activeTab === "html" ? (
                            <Editor
                                height="100%"
                                language="html"
                                theme="vs-dark"
                                value={html}
                                onChange={(val) => setHtml(val ?? "")}
                                options={{ minimap: { enabled: false }, fontSize: 14 }}
                            />
                        ) : (
                            <Editor
                                height="100%"
                                language="css"
                                theme="vs-dark"
                                value={css}
                                onChange={(val) => setCss(val ?? "")}
                                options={{ minimap: { enabled: false }, fontSize: 14 }}
                            />
                        )}
                    </div>

                </div>

                <div className="preview-pane">
                    <div className="preview-pane-header">Preview</div>
                    <iframe
                        title="html-css-preview"
                        srcDoc={srcDoc}
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

            {showLoginModal && (
                <LoginRequiredModal
                    message="Login to save your code snippets and access them anytime."
                    onCancel={() => setShowLoginModal(false)}
                />
            )}

        </div>
    );
};

export default HtmlCssEditor;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Braces, Atom, Trash2, ExternalLink } from "lucide-react";

import { getAllSnippets, deleteSnippet } from "../../utils/codeStorage";

import "./SavedCodes.css";

const TYPE_META = {
    "html-css": {
        label: "HTML / CSS",
        icon: Code2,
        route: "/code-editor/html-css",
        color: "#f97316",
    },
    javascript: {
        label: "JavaScript",
        icon: Braces,
        route: "/code-editor/javascript",
        color: "#eab308",
    },
    react: {
        label: "React",
        icon: Atom,
        route: "/code-editor/react",
        color: "#2563eb",
    },
};

const FILTERS = ["all", "html-css", "javascript", "react"];

const SavedCodes = () => {

    const navigate = useNavigate();
    const [snippets, setSnippets] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        setSnippets(getAllSnippets());
    }, []);

    const handleDelete = (id) => {
        deleteSnippet(id);
        setSnippets((prev) => prev.filter((s) => s.id !== id));
    };

    const handleLoad = (snippet) => {
        const route = TYPE_META[snippet.type]?.route;
        if (route) navigate(`${route}?load=${snippet.id}`);
    };

    const visible =
        filter === "all"
            ? snippets
            : snippets.filter((s) => s.type === filter);

    return (
        <div className="saved-codes-page">

            <div className="saved-codes-header">
                <h1>Saved Codes</h1>
                <p>All your locally saved snippets, in one place.</p>
            </div>

            <div className="saved-codes-filters">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        className={filter === f ? "filter-chip active" : "filter-chip"}
                        onClick={() => setFilter(f)}
                        type="button"
                    >
                        {f === "all" ? "All" : TYPE_META[f].label}
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <div className="saved-codes-empty">
                    No saved snippets yet. Build something in the code editor
                    and hit Save.
                </div>
            ) : (
                <div className="saved-codes-grid">
                    {visible.map((snippet) => {
                        const meta = TYPE_META[snippet.type];
                        const Icon = meta?.icon || Code2;

                        return (
                            <div className="snippet-card" key={snippet.id}>

                                <div className="snippet-card-top">
                                    <span
                                        className="snippet-type-badge"
                                        style={{ background: `${meta?.color}1a`, color: meta?.color }}
                                    >
                                        <Icon size={14} />
                                        {meta?.label || snippet.type}
                                    </span>

                                    <button
                                        className="snippet-delete-btn"
                                        onClick={() => handleDelete(snippet.id)}
                                        type="button"
                                        aria-label="Delete snippet"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 className="snippet-title">{snippet.title}</h3>

                                <p className="snippet-date">
                                    Updated{" "}
                                    {new Date(snippet.updatedAt).toLocaleDateString(
                                        "en-IN",
                                        { day: "numeric", month: "short", year: "numeric" }
                                    )}
                                </p>

                                <button
                                    className="snippet-load-btn"
                                    onClick={() => handleLoad(snippet)}
                                    type="button"
                                >
                                    Open in Editor
                                    <ExternalLink size={14} />
                                </button>

                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default SavedCodes;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Lightbulb, Pencil } from "lucide-react";

import { getAllResumes } from "../../utils/resumeStorage";
import { generateSuggestions } from "../../utils/resumeAnalyzer";
import "./AiSuggestions.css";

const AiSuggestions = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [suggestions, setSuggestions] = useState(null);

    useEffect(() => {
        const all = getAllResumes();
        setResumes(all);
        if (all.length) setSelectedId(all[0].id);
    }, []);

    const handleAnalyze = () => {
        const resume = resumes.find((r) => r.id === selectedId);
        if (!resume) return;
        setSuggestions(generateSuggestions(resume));
    };

    return (
        <div className="suggestions-page">
            <div className="suggestions-head">
                <Sparkles size={26} />
                <div>
                    <h1>AI Suggestions</h1>
                    <p>Section-by-section, actionable tips to strengthen your resume.</p>
                </div>
            </div>

            {resumes.length === 0 ? (
                <div className="suggestions-empty">
                    <p>You don't have any saved resumes yet.</p>
                    <button onClick={() => navigate("/resume-builder/create")}>Create a resume</button>
                </div>
            ) : (
                <>
                    <div className="suggestions-controls">
                        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                            {resumes.map((r) => (
                                <option key={r.id} value={r.id}>{r.title || "Untitled Resume"}</option>
                            ))}
                        </select>
                        <button onClick={handleAnalyze}><Lightbulb size={16} /> Get Suggestions</button>
                    </div>

                    {suggestions && (
                        <div className="suggestions-list">
                            {suggestions.map((s, i) => (
                                <div className="suggestion-card" key={i}>
                                    <span className="suggestion-tag">{s.section}</span>
                                    <p>{s.tip}</p>
                                </div>
                            ))}
                            <button
                                className="suggestions-edit-btn"
                                onClick={() => navigate(`/resume-builder/create?id=${selectedId}`)}
                            >
                                <Pencil size={15} /> Apply changes in editor
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AiSuggestions;

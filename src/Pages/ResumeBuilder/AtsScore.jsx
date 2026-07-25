import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

import { getAllResumes } from "../../utils/resumeStorage";
import { runAtsCheck, resumeToText } from "../../utils/resumeAnalyzer";
import "./AtsScore.css";

const ScoreRing = ({ score }) => {
    const color = score >= 85 ? "#059669" : score >= 70 ? "#2563eb" : score >= 50 ? "#d97706" : "#dc2626";
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (score / 100) * circumference;

    return (
        <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="52" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle
                cx="65" cy="65" r="52" fill="none" stroke={color} strokeWidth="12"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 65 65)"
            />
            <text x="65" y="60" textAnchor="middle" fontSize="26" fontWeight="700" fill="#111827">{score}</text>
            <text x="65" y="80" textAnchor="middle" fontSize="12" fill="#6b7280">/ 100</text>
        </svg>
    );
};

const AtsScore = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [pastedText, setPastedText] = useState("");
    const [useCustomText, setUseCustomText] = useState(false);
    const [jobKeywords, setJobKeywords] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const all = getAllResumes();
        setResumes(all);
        if (all.length) setSelectedId(all[0].id);
    }, []);

    const handleCheck = () => {
        let text = "";
        if (useCustomText) {
            text = pastedText;
        } else {
            const resume = resumes.find((r) => r.id === selectedId);
            text = resumeToText(resume);
        }
        if (!text.trim()) return;
        setResult(runAtsCheck(text, jobKeywords));
    };

    return (
        <div className="ats-page">
            <div className="ats-head">
                <ShieldCheck size={26} />
                <div>
                    <h1>ATS Score Checker</h1>
                    <p>A simple rule-based check for keywords, structure, and length — runs entirely in your browser.</p>
                </div>
            </div>

            <div className="ats-body">
                <div className="ats-input-panel">
                    <div className="ats-source-toggle">
                        <button className={!useCustomText ? "active" : ""} onClick={() => setUseCustomText(false)}>Use a saved resume</button>
                        <button className={useCustomText ? "active" : ""} onClick={() => setUseCustomText(true)}>Paste resume text</button>
                    </div>

                    {!useCustomText ? (
                        resumes.length ? (
                            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                                {resumes.map((r) => (
                                    <option key={r.id} value={r.id}>{r.title || "Untitled Resume"}</option>
                                ))}
                            </select>
                        ) : (
                            <p className="ats-empty-hint">You don't have any saved resumes yet — paste resume text instead, or create one first.</p>
                        )
                    ) : (
                        <textarea
                            rows={10}
                            placeholder="Paste your resume text here..."
                            value={pastedText}
                            onChange={(e) => setPastedText(e.target.value)}
                        />
                    )}

                    <label className="ats-label">Target job keywords (optional, comma separated)</label>
                    <input
                        placeholder="e.g. React, REST APIs, Agile, SQL"
                        value={jobKeywords}
                        onChange={(e) => setJobKeywords(e.target.value)}
                    />

                    <button className="ats-check-btn" onClick={handleCheck}>Check ATS Score</button>
                </div>

                <div className="ats-result-panel">
                    {!result ? (
                        <div className="ats-placeholder">
                            <ShieldCheck size={40} />
                            <p>Your score and breakdown will appear here.</p>
                        </div>
                    ) : (
                        <>
                            <div className="ats-score-summary">
                                <ScoreRing score={result.score} />
                                <div>
                                    <span className={`ats-rating ${result.rating.replace(/\s/g, "-").toLowerCase()}`}>{result.rating}</span>
                                    <p>{result.wordCount} words · {result.actionCount} action verbs · {result.numberCount} quantified results</p>
                                </div>
                            </div>

                            {result.keywordMatch && (
                                <div className="ats-keyword-match">
                                    <strong>Keyword match: {result.keywordMatch.pct}%</strong>
                                    {result.keywordMatch.missing.length > 0 && (
                                        <p>Missing: {result.keywordMatch.missing.join(", ")}</p>
                                    )}
                                </div>
                            )}

                            {result.passes.length > 0 && (
                                <div className="ats-list ats-passes">
                                    <h4>What's working</h4>
                                    {result.passes.map((p, i) => (
                                        <div className="ats-list-item" key={i}><CheckCircle2 size={15} /> {p}</div>
                                    ))}
                                </div>
                            )}

                            {result.issues.length > 0 && (
                                <div className="ats-list ats-issues">
                                    <h4>To improve</h4>
                                    {result.issues.map((issue, i) => (
                                        <div className="ats-list-item" key={i}><AlertTriangle size={15} /> {issue}</div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AtsScore;

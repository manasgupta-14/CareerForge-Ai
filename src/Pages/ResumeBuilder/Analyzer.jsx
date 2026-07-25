import { useState } from "react";
import { SearchCheck, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react";

import { runAtsCheck } from "../../utils/resumeAnalyzer";
import "./Analyzer.css";

const STOP_WORDS = new Set(["the", "and", "for", "with", "that", "this", "from", "have", "was", "are", "your", "you", "our"]);

const topKeywords = (text) => {
    const freq = {};
    (text.toLowerCase().match(/[a-z][a-z+.#]{2,}/g) || []).forEach((word) => {
        if (STOP_WORDS.has(word)) return;
        freq[word] = (freq[word] || 0) + 1;
    });
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);
};

const Analyzer = () => {
    const [text, setText] = useState("");
    const [jobKeywords, setJobKeywords] = useState("");
    const [result, setResult] = useState(null);
    const [keywords, setKeywords] = useState([]);

    const handleAnalyze = () => {
        if (!text.trim()) return;
        setResult(runAtsCheck(text, jobKeywords));
        setKeywords(topKeywords(text));
    };

    return (
        <div className="analyzer-page">
            <div className="analyzer-head">
                <SearchCheck size={26} />
                <div>
                    <h1>Resume Analyzer</h1>
                    <p>Paste any resume's text for a full readability, keyword, and ATS-style breakdown.</p>
                </div>
            </div>

            <div className="analyzer-input">
                <textarea
                    rows={12}
                    placeholder="Paste the full text of a resume here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="analyzer-input-row">
                    <input
                        placeholder="Target job keywords (optional, comma separated)"
                        value={jobKeywords}
                        onChange={(e) => setJobKeywords(e.target.value)}
                    />
                    <button onClick={handleAnalyze}>Analyze</button>
                </div>
            </div>

            {result && (
                <div className="analyzer-report">
                    <div className="analyzer-stats">
                        <div className="stat-card">
                            <BarChart3 size={18} />
                            <div>
                                <strong>{result.score}/100</strong>
                                <span>ATS-style score</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <strong>{result.wordCount}</strong>
                            <span>Words</span>
                        </div>
                        <div className="stat-card">
                            <strong>{result.actionCount}</strong>
                            <span>Action verbs</span>
                        </div>
                        <div className="stat-card">
                            <strong>{result.numberCount}</strong>
                            <span>Quantified results</span>
                        </div>
                        <div className="stat-card">
                            <strong>{result.hasEmail && result.hasPhone ? "Yes" : "No"}</strong>
                            <span>Contact info complete</span>
                        </div>
                    </div>

                    {keywords.length > 0 && (
                        <div className="analyzer-keywords">
                            <h4>Most frequent keywords</h4>
                            <div className="keyword-chips">
                                {keywords.map(([word, count]) => (
                                    <span key={word}>{word} <em>×{count}</em></span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="analyzer-columns">
                        {result.passes.length > 0 && (
                            <div className="analyzer-list">
                                <h4>What's working</h4>
                                {result.passes.map((p, i) => (
                                    <div className="list-item pass" key={i}><CheckCircle2 size={15} /> {p}</div>
                                ))}
                            </div>
                        )}
                        {result.issues.length > 0 && (
                            <div className="analyzer-list">
                                <h4>Issues to fix</h4>
                                {result.issues.map((issue, i) => (
                                    <div className="list-item issue" key={i}><AlertTriangle size={15} /> {issue}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Code2, Trophy, MessagesSquare, ArrowRight, History, LogIn } from "lucide-react";

import { CATEGORY_META, QUIZ_DATA } from "../../data/quizData";
import { getBestAttempt, getAllAttempts } from "../../utils/quizStorage";
import { useAuth } from "../../Context/AuthContext";
import "./QuizHub.css";

const formatDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
};

const QuizHub = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [bestScores, setBestScores] = useState({});
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const scores = {};
        Object.keys(CATEGORY_META).forEach((key) => {
            scores[key] = isAuthenticated ? getBestAttempt(key) : null;
        });
        setBestScores(scores);
        setHistory(isAuthenticated ? getAllAttempts().slice(0, 8) : []);
    }, [isAuthenticated]);

    return (
        <div className="quiz-hub-page">
            <div className="quiz-hub-heading">
                <span>TEST YOUR SKILLS</span>
                <h2>Interview Quiz & Prep Zone</h2>
                <p>
                    Practice topic-wise quizzes to sharpen your fundamentals, then run
                    through mock interview questions to prepare for the real thing.
                </p>
            </div>

            {isAuthenticated ? (
                <div className="quiz-history-block">
                    <div className="quiz-history-head">
                        <History size={18} />
                        <h3>Your Quiz History</h3>
                    </div>

                    {history.length === 0 ? (
                        <p className="quiz-history-empty">
                            No attempts yet — play a quiz below to start tracking your scores.
                        </p>
                    ) : (
                        <div className="quiz-history-list">
                            {history.map((a) => (
                                <div className="quiz-history-item" key={a.id}>
                                    <span
                                        className="quiz-history-cat"
                                        style={{
                                            background: CATEGORY_META[a.category]?.bg,
                                            color: CATEGORY_META[a.category]?.color,
                                        }}
                                    >
                                        {CATEGORY_META[a.category]?.label || a.category}
                                    </span>
                                    <span className="quiz-history-score">
                                        {a.score}/{a.total}
                                    </span>
                                    <span className="quiz-history-date">{formatDate(a.takenAt)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="quiz-history-login-prompt">
                    <LogIn size={16} />
                    <span>
                        <Link to="/login">Login</Link> to see your quiz score history here.
                    </span>
                </div>
            )}

            <div className="quiz-cards-container">
                {Object.values(CATEGORY_META).map((cat) => {
                    const total = QUIZ_DATA[cat.key]?.length || 0;
                    const best = bestScores[cat.key];

                    return (
                        <div
                            className="quiz-card"
                            key={cat.key}
                            onClick={() => navigate(`/quiz/${cat.key}`)}
                        >
                            <div
                                className="quiz-card-icon"
                                style={{ background: cat.bg, color: cat.color }}
                            >
                                <Code2 size={26} />
                            </div>

                            <h3>{cat.label}</h3>
                            <p>{cat.description}</p>

                            <div className="quiz-card-meta">
                                <span>{total} questions</span>
                                {best && (
                                    <span className="quiz-card-best">
                                        <Trophy size={13} /> Best: {best.score}/{best.total}
                                    </span>
                                )}
                            </div>

                            <button className="quiz-card-btn">
                                Start Quiz <ArrowRight size={15} />
                            </button>
                        </div>
                    );
                })}

                <div
                    className="quiz-card quiz-card-interview"
                    onClick={() => navigate("/quiz/mock-interview")}
                >
                    <div className="quiz-card-icon" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                        <MessagesSquare size={26} />
                    </div>

                    <h3>Mock Interview</h3>
                    <p>Practice open-ended technical & behavioral interview questions with guided hints.</p>

                    <div className="quiz-card-meta">
                        <span>Self-paced · No scoring</span>
                    </div>

                    <button className="quiz-card-btn">
                        Start Practice <ArrowRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizHub;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Trophy, MessagesSquare, ArrowRight } from "lucide-react";

import { CATEGORY_META, QUIZ_DATA } from "../../data/quizData";
import { getBestAttempt } from "../../utils/quizStorage";
import "./QuizHub.css";

const QuizHub = () => {
    const navigate = useNavigate();
    const [bestScores, setBestScores] = useState({});

    useEffect(() => {
        const scores = {};
        Object.keys(CATEGORY_META).forEach((key) => {
            scores[key] = getBestAttempt(key);
        });
        setBestScores(scores);
    }, []);

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

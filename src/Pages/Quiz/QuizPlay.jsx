import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    RotateCcw,
    Trophy,
    ListChecks,
} from "lucide-react";

import { CATEGORY_META, QUIZ_DATA } from "../../data/quizData";
import { saveAttempt, getBestAttempt } from "../../utils/quizStorage";
import "./QuizPlay.css";

const QuizPlay = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const meta = CATEGORY_META[category];
    const questions = QUIZ_DATA[category];

    const [phase, setPhase] = useState("start"); 
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    if (!meta || !questions) {
        return (
            <div className="quiz-play-page">
                <div className="quiz-not-found">
                    <h2>Quiz not found</h2>
                    <p>We couldn't find that quiz category.</p>
                    <Link to="/quiz" className="quiz-back-link">← Back to Quiz Hub</Link>
                </div>
            </div>
        );
    }

    const best = getBestAttempt(category);
    const current = questions[index];
    const isLast = index === questions.length - 1;

    const startQuiz = () => {
        setPhase("active");
        setIndex(0);
        setSelected(null);
        setAnswers([]);
        setResult(null);
    };

    const handleSelect = (optionIndex) => {
        if (selected !== null) return;
        setSelected(optionIndex);
    };

    const handleNext = () => {
        const isCorrect = selected === current.answer;
        const updatedAnswers = [
            ...answers,
            { questionId: current.id, selected, correct: isCorrect },
        ];

        if (isLast) {
            const score = updatedAnswers.filter((a) => a.correct).length;
            const attempt = saveAttempt({
                category,
                score,
                total: questions.length,
                answers: updatedAnswers,
            });
            setResult(attempt);
            setPhase("end");
        } else {
            setAnswers(updatedAnswers);
            setIndex(index + 1);
            setSelected(null);
        }
    };

    const optionClass = (optIndex) => {
        if (selected === null) return "quiz-option";
        if (optIndex === current.answer) return "quiz-option correct";
        if (optIndex === selected) return "quiz-option wrong";
        return "quiz-option disabled";
    };

    return (
        <div className="quiz-play-page">
            <div
                className="quiz-play-head"
                style={{ color: meta.color }}
            >
                <div>
                    <h1>{meta.label}</h1>
                    <p>{meta.description}</p>
                </div>
                <Link to="/quiz" className="quiz-back-link">← All Quizzes</Link>
            </div>

            {phase === "start" && (
                <div className="quiz-start-panel">
                    <div className="quiz-start-icon" style={{ background: meta.bg, color: meta.color }}>
                        <ListChecks size={30} />
                    </div>
                    <h2>{questions.length} Questions</h2>
                    <p>Answer each question — you'll see the correct answer right after you pick one.</p>

                    {best && (
                        <div className="quiz-best-banner">
                            <Trophy size={15} /> Your best score: {best.score}/{best.total}
                        </div>
                    )}

                    <button className="quiz-primary-btn" onClick={startQuiz}>
                        {best ? "Retake Quiz" : "Start Quiz"}
                    </button>
                </div>
            )}

            {phase === "active" && current && (
                <div className="quiz-active-panel">
                    <div className="quiz-progress-row">
                        <span>Question {index + 1} of {questions.length}</span>
                        <div className="quiz-progress-track">
                            <div
                                className="quiz-progress-fill"
                                style={{
                                    width: `${((index + (selected !== null ? 1 : 0)) / questions.length) * 100}%`,
                                    background: meta.color,
                                }}
                            />
                        </div>
                    </div>

                    <h3 className="quiz-question-text">{current.question}</h3>

                    <div className="quiz-options-list">
                        {current.options.map((opt, i) => (
                            <button
                                key={i}
                                className={optionClass(i)}
                                onClick={() => handleSelect(i)}
                            >
                                <span>{opt}</span>
                                {selected !== null && i === current.answer && <CheckCircle2 size={18} />}
                                {selected !== null && i === selected && i !== current.answer && <XCircle size={18} />}
                            </button>
                        ))}
                    </div>

                    {selected !== null && (
                        <div className="quiz-explanation">
                            <strong>{selected === current.answer ? "Correct!" : "Not quite."}</strong>
                            <p>{current.explanation}</p>
                        </div>
                    )}

                    <button
                        className="quiz-primary-btn quiz-next-btn"
                        disabled={selected === null}
                        onClick={handleNext}
                    >
                        {isLast ? "Finish Quiz" : "Next Question"} <ArrowRight size={16} />
                    </button>
                </div>
            )}

            {phase === "end" && result && (
                <div className="quiz-result-panel">
                    <div className="quiz-result-score" style={{ color: meta.color }}>
                        {result.score} / {result.total}
                    </div>
                    <p className="quiz-result-label">
                        {result.score === result.total
                            ? "Perfect score! 🎉"
                            : result.score / result.total >= 0.6
                            ? "Good effort — a bit more practice and you'll ace it."
                            : "Keep practicing — review the explanations below."}
                    </p>

                    <div className="quiz-review-list">
                        {questions.map((q, i) => {
                            const a = result.answers[i];
                            return (
                                <div className="quiz-review-item" key={q.id}>
                                    {a.correct ? (
                                        <CheckCircle2 size={16} className="review-correct" />
                                    ) : (
                                        <XCircle size={16} className="review-wrong" />
                                    )}
                                    <div>
                                        <p className="quiz-review-question">{q.question}</p>
                                        <p className="quiz-review-answer">
                                            Correct answer: <strong>{q.options[q.answer]}</strong>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="quiz-result-actions">
                        <button className="quiz-secondary-btn" onClick={startQuiz}>
                            <RotateCcw size={15} /> Retake Quiz
                        </button>
                        <button className="quiz-primary-btn" onClick={() => navigate("/quiz")}>
                            Back to Quiz Hub
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPlay;

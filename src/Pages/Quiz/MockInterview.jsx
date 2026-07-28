import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MessagesSquare,
    Lightbulb,
    ArrowRight,
    ArrowLeft,
    ThumbsUp,
    RotateCcw,
} from "lucide-react";

import { MOCK_INTERVIEW_QUESTIONS } from "../../data/quizData";
import "./MockInterview.css";

const MockInterview = () => {
    const [index, setIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [ratings, setRatings] = useState({}); 

    const current = MOCK_INTERVIEW_QUESTIONS[index];
    const isLast = index === MOCK_INTERVIEW_QUESTIONS.length - 1;
    const answeredCount = Object.keys(ratings).length;

    const goTo = (newIndex) => {
        setIndex(newIndex);
        setShowHint(false);
        setAnswerText("");
    };

    const rate = (value) => {
        setRatings((prev) => ({ ...prev, [current.id]: value }));
        if (!isLast) goTo(index + 1);
    };

    const restart = () => {
        setRatings({});
        goTo(0);
    };

    return (
        <div className="mock-page">
            <div className="mock-head">
                <div>
                    <h1>Mock Interview Practice</h1>
                    <p>Answer out loud or type your thoughts, then reveal the hint to compare your approach.</p>
                </div>
                <Link to="/quiz" className="quiz-back-link">← All Quizzes</Link>
            </div>

            <div className="mock-progress-row">
                <span>Question {index + 1} of {MOCK_INTERVIEW_QUESTIONS.length}</span>
                <span>{answeredCount} rated</span>
            </div>

            <div className="mock-card">
                <span className="mock-category-tag">{current.category}</span>

                <div className="mock-question-row">
                    <MessagesSquare size={22} />
                    <h2>{current.question}</h2>
                </div>

                <textarea
                    className="mock-answer-box"
                    placeholder="Jot down your answer or key points here (optional, not saved)..."
                    rows={5}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                />

                {!showHint ? (
                    <button className="mock-hint-btn" onClick={() => setShowHint(true)}>
                        <Lightbulb size={15} /> Reveal Guidance
                    </button>
                ) : (
                    <div className="mock-hint-box">
                        <Lightbulb size={15} />
                        <p>{current.hint}</p>
                    </div>
                )}

                <div className="mock-rate-row">
                    <span>How did that feel?</span>
                    <div className="mock-rate-btns">
                        <button className="mock-rate-btn confident" onClick={() => rate("confident")}>
                            <ThumbsUp size={14} /> Confident
                        </button>
                        <button className="mock-rate-btn practice" onClick={() => rate("practice")}>
                            Needs Practice
                        </button>
                    </div>
                </div>
            </div>

            <div className="mock-nav-row">
                <button
                    className="quiz-secondary-btn"
                    disabled={index === 0}
                    onClick={() => goTo(index - 1)}
                >
                    <ArrowLeft size={15} /> Previous
                </button>

                {isLast ? (
                    <button className="quiz-secondary-btn" onClick={restart}>
                        <RotateCcw size={15} /> Start Over
                    </button>
                ) : (
                    <button className="quiz-primary-btn" onClick={() => goTo(index + 1)}>
                        Skip <ArrowRight size={15} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MockInterview;

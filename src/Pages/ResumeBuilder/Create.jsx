import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    PenLine, Sparkles, MessageCircle, Download, Save,
    Send, Bot, User as UserIcon,
} from "lucide-react";

import ResumeForm from "../../Components/ResumeComponent/ResumeForm";
import ResumePreview from "../../Components/ResumeComponent/ResumePreview";
import {
    emptyResume, getResumeById, saveResume, setActiveResumeId,
} from "../../utils/resumeStorage";
import { parseFreeTextToResume, CHAT_QUESTIONS, buildResumeFromChat } from "../../utils/resumeGenerator";

import "./Create.css";

const MODES = [
    { id: "manual", label: "Manual", icon: PenLine },
    { id: "ai", label: "AI Generate", icon: Sparkles },
    { id: "chat", label: "Chat Assistant", icon: MessageCircle },
];

const TEMPLATE_COUNT = 6;

const Create = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("id");

    const [resume, setResume] = useState(() => {
        if (editId) {
            const existing = getResumeById(editId);
            if (existing) return existing;
        }
        return emptyResume();
    });
    const [mode, setMode] = useState("manual");
    const [saved, setSaved] = useState(false);

    // ---- AI Generate state ----
    const [aiText, setAiText] = useState("");
    const [aiRole, setAiRole] = useState("");

    // ---- Chat Assistant state ----
    const [chatLog, setChatLog] = useState([
        { from: "bot", text: CHAT_QUESTIONS[0].prompt },
    ]);
    const [chatInput, setChatInput] = useState("");
    const [chatStep, setChatStep] = useState(0);
    const [chatAnswers, setChatAnswers] = useState({ experienceAnswers: [] });
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    useEffect(() => {
        setSaved(false);
    }, [resume]);

    const handleSave = () => {
        const updated = saveResume({ ...resume, title: resume.personal.fullName ? `${resume.personal.fullName}'s Resume` : resume.title });
        setResume(updated);
        setActiveResumeId(updated.id);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDownload = () => {
        window.print();
    };

    const applyGenerated = (partial) => {
        setResume((prev) => ({
            ...prev,
            personal: { ...prev.personal, ...partial.personal },
            targetRole: partial.targetRole || prev.targetRole,
            summary: partial.summary || prev.summary,
            skills: partial.skills?.length ? partial.skills : prev.skills,
            experience: partial.experience?.length ? [...prev.experience, ...partial.experience] : prev.experience,
            education: partial.education?.length ? [...prev.education, ...partial.education] : prev.education,
        }));
        setMode("manual");
    };

    const handleAiGenerate = () => {
        if (!aiText.trim()) return;
        const partial = parseFreeTextToResume(aiText, aiRole);
        applyGenerated(partial);
    };

    // ---- Chat Assistant logic ----
    const currentQuestion = CHAT_QUESTIONS[chatStep];

    const pushBotMessage = (text) => setChatLog((log) => [...log, { from: "bot", text }]);
    const pushUserMessage = (text) => setChatLog((log) => [...log, { from: "user", text }]);

    const handleChatSend = () => {
        const value = chatInput.trim();
        if (!value || !currentQuestion) return;

        pushUserMessage(value);
        setChatInput("");

        const answers = { ...chatAnswers };

        if (currentQuestion.key === "moreExperience") {
            if (/^no$/i.test(value)) {
                // move past experience loop to next question after the loop questions
                const nextIndex = CHAT_QUESTIONS.findIndex((q) => q.key === "education");
                setChatStep(nextIndex);
                setChatAnswers(answers);
                setTimeout(() => pushBotMessage(CHAT_QUESTIONS[nextIndex].prompt), 200);
                return;
            }
            answers.experienceAnswers = [...(answers.experienceAnswers || []), value];
            setChatAnswers(answers);
            setTimeout(() => pushBotMessage(CHAT_QUESTIONS[chatStep].prompt), 200); // ask "more?" again
            return;
        }

        if (currentQuestion.key === "experience") {
            answers.experienceAnswers = [...(answers.experienceAnswers || []), value];
        } else {
            answers[currentQuestion.key] = value;
        }
        setChatAnswers(answers);

        const nextStep = chatStep + 1;
        if (nextStep < CHAT_QUESTIONS.length) {
            setChatStep(nextStep);
            setTimeout(() => pushBotMessage(CHAT_QUESTIONS[nextStep].prompt), 200);
        } else {
            // Done — build resume
            const built = buildResumeFromChat(answers);
            setTimeout(() => {
                pushBotMessage("All set! I've built your resume — switching you to the editor so you can fine-tune it.");
                applyGenerated(built);
            }, 200);
        }
    };

    const handleChatKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleChatSend();
        }
    };

    return (
        <div className="create-page">
            <div className="create-toolbar">
                <div className="create-modes">
                    {MODES.map((m) => {
                        const Icon = m.icon;
                        return (
                            <button
                                key={m.id}
                                className={`create-mode-btn ${mode === m.id ? "active" : ""}`}
                                onClick={() => setMode(m.id)}
                            >
                                <Icon size={16} /> {m.label}
                            </button>
                        );
                    })}
                </div>
                <div className="create-actions">
                    <button className="create-save-btn" onClick={handleSave}>
                        <Save size={16} /> {saved ? "Saved!" : "Save"}
                    </button>
                    <button className="create-download-btn" onClick={handleDownload}>
                        <Download size={16} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="create-body">
                <div className="create-left">
                    {mode === "manual" && (
                        <ResumeForm resume={resume} onChange={setResume} />
                    )}

                    {mode === "ai" && (
                        <div className="ai-generate-panel">
                            <h3><Sparkles size={16} /> AI Generate</h3>
                            <p className="ai-hint">
                                Describe yourself in your own words — background, experience, skills — and
                                we'll auto-fill your resume fields. You can edit everything afterwards.
                            </p>
                            <input
                                className="ai-role-input"
                                placeholder="Target role (optional), e.g. Frontend Developer"
                                value={aiRole}
                                onChange={(e) => setAiRole(e.target.value)}
                            />
                            <textarea
                                rows={10}
                                placeholder={`e.g. "John Doe, john@email.com, 9876543210. Software Engineer at Acme Corp from 2021-2023, built the payments dashboard and improved load time by 40%. B.Tech in Computer Science from XYZ University. Skills: React, Node.js, SQL, Communication."`}
                                value={aiText}
                                onChange={(e) => setAiText(e.target.value)}
                            />
                            <button className="ai-generate-btn" onClick={handleAiGenerate}>
                                <Sparkles size={15} /> Generate Resume
                            </button>
                        </div>
                    )}

                    {mode === "chat" && (
                        <div className="chat-panel">
                            <h3><MessageCircle size={16} /> Chat Assistant</h3>
                            <div className="chat-log">
                                {chatLog.map((msg, i) => (
                                    <div key={i} className={`chat-msg ${msg.from}`}>
                                        <span className="chat-avatar">
                                            {msg.from === "bot" ? <Bot size={15} /> : <UserIcon size={15} />}
                                        </span>
                                        <span className="chat-bubble">{msg.text}</span>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                            <div className="chat-input-row">
                                <input
                                    placeholder="Type your answer..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={handleChatKeyDown}
                                />
                                <button onClick={handleChatSend}><Send size={16} /></button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="create-right">
                    <div className="template-switcher">
                        {Array.from({ length: TEMPLATE_COUNT }, (_, i) => i + 1).map((id) => (
                            <button
                                key={id}
                                className={`template-dot ${resume.templateId === id ? "active" : ""}`}
                                onClick={() => setResume((prev) => ({ ...prev, templateId: id }))}
                                title={`Template ${id}`}
                            >
                                {id}
                            </button>
                        ))}
                    </div>
                    <div className="preview-scroll">
                        <ResumePreview resume={resume} templateId={resume.templateId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;

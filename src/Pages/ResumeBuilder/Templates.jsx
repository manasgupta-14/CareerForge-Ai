import { useNavigate } from "react-router-dom";
import ResumePreview from "../../Components/ResumeComponent/ResumePreview";
import { emptyResume, saveResume, setActiveResumeId } from "../../utils/resumeStorage";
import "./Templates.css";

const SAMPLE_RESUME = {
    ...emptyResume(),
    personal: {
        fullName: "Aarav Sharma",
        email: "aarav.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Bengaluru, India",
        linkedin: "linkedin.com/in/aaravsharma",
        portfolio: "",
    },
    targetRole: "Frontend Developer",
    summary: "Frontend developer with 3+ years building fast, accessible React applications for consumer products.",
    experience: [
        {
            id: "e1", title: "Frontend Engineer", company: "Nimbus Labs", location: "Bengaluru",
            start: "2022", end: "Present", current: true,
            description: "Led migration to React 18, improving load time by 35%.\nBuilt a component library used across 4 product teams.",
        },
    ],
    education: [
        { id: "ed1", degree: "B.Tech, Computer Science", school: "NIT Trichy", location: "Trichy", start: "2018", end: "2022" },
    ],
    skills: ["React", "TypeScript", "CSS", "Node.js", "Figma"],
    projects: [],
    certifications: [],
};

const TEMPLATE_META = [
    { id: 1, name: "Classic Blue", desc: "Clean and professional, great default choice." },
    { id: 2, name: "Minimal Mono", desc: "Centered serif layout, understated and elegant." },
    { id: 3, name: "Sidebar Dark", desc: "Bold dark header for a modern look." },
    { id: 4, name: "Bold Accent", desc: "Strong accent blocks for section headers." },
    { id: 5, name: "Compact Green", desc: "Tight spacing, ideal for longer resumes." },
    { id: 6, name: "Elegant Serif", desc: "Sophisticated serif styling for senior roles." },
];

const Templates = () => {
    const navigate = useNavigate();

    const handleUseTemplate = (templateId) => {
        const resume = { ...emptyResume(), templateId };
        const saved = saveResume(resume);
        setActiveResumeId(saved.id);
        navigate(`/resume-builder/create?id=${saved.id}`);
    };

    return (
        <div className="templates-page">
            <div className="templates-head">
                <h1>Resume Templates</h1>
                <p>Pick a style — you can switch templates anytime while editing.</p>
            </div>

            <div className="templates-grid">
                {TEMPLATE_META.map((t) => (
                    <div className="template-card" key={t.id}>
                        <div className="template-thumb">
                            <div className="template-thumb-inner">
                                <ResumePreview resume={SAMPLE_RESUME} templateId={t.id} />
                            </div>
                        </div>
                        <div className="template-card-info">
                            <h3>{t.name}</h3>
                            <p>{t.desc}</p>
                            <button onClick={() => handleUseTemplate(t.id)}>Use this template</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates;

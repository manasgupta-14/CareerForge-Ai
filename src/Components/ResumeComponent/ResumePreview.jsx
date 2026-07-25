import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";
import "./ResumePreview.css";

const dateRange = (start, end, current) => {
    if (!start && !end) return "";
    return `${start || ""} – ${current ? "Present" : end || ""}`;
};

const ResumePreview = ({ resume, templateId = 1 }) => {
    if (!resume) return null;

    const { personal = {}, summary, experience = [], education = [], skills = [], projects = [], certifications = [] } = resume;

    return (
        <div className={`resume-preview template-${templateId}`} id="resume-preview-print">
            <header className="rp-header">
                <h1>{personal.fullName || "Your Name"}</h1>
                {resume.targetRole && <p className="rp-role">{resume.targetRole}</p>}
                <div className="rp-contact">
                    {personal.email && (
                        <span><Mail size={13} /> {personal.email}</span>
                    )}
                    {personal.phone && (
                        <span><Phone size={13} /> {personal.phone}</span>
                    )}
                    {personal.location && (
                        <span><MapPin size={13} /> {personal.location}</span>
                    )}
                    {personal.linkedin && (
                        <span><Link2 size={13} /> {personal.linkedin.replace(/^https?:\/\//, "")}</span>
                    )}
                    {personal.portfolio && (
                        <span><Globe size={13} /> {personal.portfolio.replace(/^https?:\/\//, "")}</span>
                    )}
                </div>
            </header>

            {summary && (
                <section className="rp-section">
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="rp-section">
                    <h2>Experience</h2>
                    {experience.map((exp) => (
                        <div className="rp-entry" key={exp.id || `${exp.title}-${exp.company}`}>
                            <div className="rp-entry-head">
                                <strong>{exp.title}</strong>
                                <span className="rp-dates">{dateRange(exp.start, exp.end, exp.current)}</span>
                            </div>
                            <div className="rp-entry-sub">
                                {[exp.company, exp.location].filter(Boolean).join(" · ")}
                            </div>
                            {exp.description && (
                                <ul>
                                    {exp.description
                                        .split(/\n|(?<=[.!?])\s+(?=[A-Z])/)
                                        .map((line) => line.trim())
                                        .filter(Boolean)
                                        .map((line, i) => <li key={i}>{line}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {education.length > 0 && (
                <section className="rp-section">
                    <h2>Education</h2>
                    {education.map((edu) => (
                        <div className="rp-entry" key={edu.id || edu.school}>
                            <div className="rp-entry-head">
                                <strong>{edu.degree}</strong>
                                <span className="rp-dates">{dateRange(edu.start, edu.end, false)}</span>
                            </div>
                            <div className="rp-entry-sub">
                                {[edu.school, edu.location].filter(Boolean).join(" · ")}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {projects.length > 0 && (
                <section className="rp-section">
                    <h2>Projects</h2>
                    {projects.map((p) => (
                        <div className="rp-entry" key={p.id || p.name}>
                            <div className="rp-entry-head">
                                <strong>{p.name}</strong>
                            </div>
                            {p.description && <p className="rp-project-desc">{p.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {skills.length > 0 && (
                <section className="rp-section">
                    <h2>Skills</h2>
                    <div className="rp-skills">
                        {skills.map((s, i) => (
                            <span className="rp-skill-chip" key={i}>{s}</span>
                        ))}
                    </div>
                </section>
            )}

            {certifications.length > 0 && (
                <section className="rp-section">
                    <h2>Certifications</h2>
                    <ul>
                        {certifications.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default ResumePreview;

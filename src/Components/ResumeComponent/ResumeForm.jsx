import { Plus, Trash2 } from "lucide-react";
import "./ResumeForm.css";

const ResumeForm = ({ resume, onChange }) => {
    const update = (path, value) => {
        const next = { ...resume };
        if (path.length === 1) {
            next[path[0]] = value;
        } else {
            next[path[0]] = { ...next[path[0]], [path[1]]: value };
        }
        onChange(next);
    };

    const updateListItem = (listKey, id, field, value) => {
        const next = {
            ...resume,
            [listKey]: resume[listKey].map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        };
        onChange(next);
    };

    const addListItem = (listKey, template) => {
        onChange({
            ...resume,
            [listKey]: [...(resume[listKey] || []), { id: `${listKey}_${Date.now()}`, ...template }],
        });
    };

    const removeListItem = (listKey, id) => {
        onChange({
            ...resume,
            [listKey]: resume[listKey].filter((item) => item.id !== id),
        });
    };

    const updateSkills = (value) => {
        onChange({
            ...resume,
            skills: value.split(",").map((s) => s.trim()).filter(Boolean),
        });
    };

    return (
        <div className="resume-form">
            <div className="rf-block">
                <h3>Basic Info</h3>
                <div className="rf-grid">
                    <input
                        placeholder="Full Name"
                        value={resume.personal.fullName}
                        onChange={(e) => update(["personal", "fullName"], e.target.value)}
                    />
                    <input
                        placeholder="Target Role (e.g. Frontend Developer)"
                        value={resume.targetRole}
                        onChange={(e) => update(["targetRole"], e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        value={resume.personal.email}
                        onChange={(e) => update(["personal", "email"], e.target.value)}
                    />
                    <input
                        placeholder="Phone"
                        value={resume.personal.phone}
                        onChange={(e) => update(["personal", "phone"], e.target.value)}
                    />
                    <input
                        placeholder="Location"
                        value={resume.personal.location}
                        onChange={(e) => update(["personal", "location"], e.target.value)}
                    />
                    <input
                        placeholder="LinkedIn URL"
                        value={resume.personal.linkedin}
                        onChange={(e) => update(["personal", "linkedin"], e.target.value)}
                    />
                    <input
                        placeholder="Portfolio / Website"
                        value={resume.personal.portfolio}
                        onChange={(e) => update(["personal", "portfolio"], e.target.value)}
                    />
                </div>
            </div>

            <div className="rf-block">
                <h3>Summary</h3>
                <textarea
                    rows={3}
                    placeholder="2-3 sentence professional summary..."
                    value={resume.summary}
                    onChange={(e) => update(["summary"], e.target.value)}
                />
            </div>

            <div className="rf-block">
                <div className="rf-block-head">
                    <h3>Experience</h3>
                    <button
                        type="button"
                        className="rf-add-btn"
                        onClick={() =>
                            addListItem("experience", {
                                title: "", company: "", location: "",
                                start: "", end: "", current: false, description: "",
                            })
                        }
                    >
                        <Plus size={14} /> Add
                    </button>
                </div>
                {(resume.experience || []).map((exp) => (
                    <div className="rf-card" key={exp.id}>
                        <button type="button" className="rf-remove-btn" onClick={() => removeListItem("experience", exp.id)}>
                            <Trash2 size={14} />
                        </button>
                        <div className="rf-grid">
                            <input placeholder="Job Title" value={exp.title} onChange={(e) => updateListItem("experience", exp.id, "title", e.target.value)} />
                            <input placeholder="Company" value={exp.company} onChange={(e) => updateListItem("experience", exp.id, "company", e.target.value)} />
                            <input placeholder="Location" value={exp.location} onChange={(e) => updateListItem("experience", exp.id, "location", e.target.value)} />
                            <input placeholder="Start (e.g. 2021)" value={exp.start} onChange={(e) => updateListItem("experience", exp.id, "start", e.target.value)} />
                            <input placeholder="End (e.g. 2023 or Present)" value={exp.end} onChange={(e) => updateListItem("experience", exp.id, "end", e.target.value)} />
                        </div>
                        <textarea
                            rows={3}
                            placeholder="What did you do? One achievement per line works best."
                            value={exp.description}
                            onChange={(e) => updateListItem("experience", exp.id, "description", e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="rf-block">
                <div className="rf-block-head">
                    <h3>Education</h3>
                    <button
                        type="button"
                        className="rf-add-btn"
                        onClick={() => addListItem("education", { degree: "", school: "", location: "", start: "", end: "" })}
                    >
                        <Plus size={14} /> Add
                    </button>
                </div>
                {(resume.education || []).map((edu) => (
                    <div className="rf-card" key={edu.id}>
                        <button type="button" className="rf-remove-btn" onClick={() => removeListItem("education", edu.id)}>
                            <Trash2 size={14} />
                        </button>
                        <div className="rf-grid">
                            <input placeholder="Degree" value={edu.degree} onChange={(e) => updateListItem("education", edu.id, "degree", e.target.value)} />
                            <input placeholder="School / University" value={edu.school} onChange={(e) => updateListItem("education", edu.id, "school", e.target.value)} />
                            <input placeholder="Location" value={edu.location} onChange={(e) => updateListItem("education", edu.id, "location", e.target.value)} />
                            <input placeholder="Start" value={edu.start} onChange={(e) => updateListItem("education", edu.id, "start", e.target.value)} />
                            <input placeholder="End" value={edu.end} onChange={(e) => updateListItem("education", edu.id, "end", e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="rf-block">
                <div className="rf-block-head">
                    <h3>Projects</h3>
                    <button
                        type="button"
                        className="rf-add-btn"
                        onClick={() => addListItem("projects", { name: "", description: "", link: "" })}
                    >
                        <Plus size={14} /> Add
                    </button>
                </div>
                {(resume.projects || []).map((p) => (
                    <div className="rf-card" key={p.id}>
                        <button type="button" className="rf-remove-btn" onClick={() => removeListItem("projects", p.id)}>
                            <Trash2 size={14} />
                        </button>
                        <div className="rf-grid">
                            <input placeholder="Project Name" value={p.name} onChange={(e) => updateListItem("projects", p.id, "name", e.target.value)} />
                            <input placeholder="Link (optional)" value={p.link} onChange={(e) => updateListItem("projects", p.id, "link", e.target.value)} />
                        </div>
                        <textarea
                            rows={2}
                            placeholder="Short description"
                            value={p.description}
                            onChange={(e) => updateListItem("projects", p.id, "description", e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="rf-block">
                <h3>Skills</h3>
                <input
                    placeholder="Comma separated, e.g. React, Node.js, SQL"
                    value={(resume.skills || []).join(", ")}
                    onChange={(e) => updateSkills(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ResumeForm;

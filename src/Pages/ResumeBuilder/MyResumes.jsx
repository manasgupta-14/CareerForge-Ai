import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus2, Pencil, Copy, Trash2, FileText } from "lucide-react";

import { getAllResumes, deleteResume, duplicateResume } from "../../utils/resumeStorage";
import "./MyResumes.css";

const formatDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch {
        return "";
    }
};

const MyResumes = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);

    const refresh = () => setResumes(getAllResumes());

    useEffect(() => {
        refresh();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Delete this resume? This can't be undone.")) {
            deleteResume(id);
            refresh();
        }
    };

    const handleDuplicate = (id) => {
        duplicateResume(id);
        refresh();
    };

    return (
        <div className="myresumes-page">
            <div className="myresumes-head">
                <div>
                    <h1>My Resumes</h1>
                    <p>All resumes are saved locally in your browser.</p>
                </div>
                <button className="new-resume-btn" onClick={() => navigate("/resume-builder/create")}>
                    <FilePlus2 size={16} /> New Resume
                </button>
            </div>

            {resumes.length === 0 ? (
                <div className="myresumes-empty">
                    <FileText size={40} />
                    <p>You haven't created any resumes yet.</p>
                    <button onClick={() => navigate("/resume-builder/create")}>Create your first resume</button>
                </div>
            ) : (
                <div className="myresumes-grid">
                    {resumes.map((r) => (
                        <div className="resume-card" key={r.id}>
                            <div className="resume-card-thumb">
                                <FileText size={28} />
                                <span>Template {r.templateId}</span>
                            </div>
                            <div className="resume-card-body">
                                <h3>{r.title || "Untitled Resume"}</h3>
                                <p>{r.personal?.fullName || "No name yet"} {r.targetRole ? `· ${r.targetRole}` : ""}</p>
                                <span className="resume-card-date">Updated {formatDate(r.updatedAt)}</span>
                            </div>
                            <div className="resume-card-actions">
                                <button onClick={() => navigate(`/resume-builder/create?id=${r.id}`)}>
                                    <Pencil size={14} /> Edit
                                </button>
                                <button onClick={() => handleDuplicate(r.id)}>
                                    <Copy size={14} /> Duplicate
                                </button>
                                <button className="danger" onClick={() => handleDelete(r.id)}>
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyResumes;

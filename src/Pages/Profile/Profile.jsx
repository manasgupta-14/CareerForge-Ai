import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    FileText,
    Globe,
    Link2,
    ExternalLink,
    Sparkles,
    Save,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

// Every field a typical professional profile is expected to have.
// Completion % = how many of these are filled in / total.
const PROFILE_FIELDS = [
    { key: "name", label: "Full Name", icon: User, type: "text", placeholder: "Your full name", readOnly: true },
    { key: "email", label: "Email", icon: Mail, type: "email", placeholder: "you@example.com", readOnly: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
    { key: "location", label: "Location", icon: MapPin, type: "text", placeholder: "City, Country" },
    { key: "headline", label: "Professional Headline", icon: Sparkles, type: "text", placeholder: "e.g. Frontend Developer" },
    { key: "experience", label: "Years of Experience", icon: Briefcase, type: "text", placeholder: "e.g. 2 Years" },
    { key: "education", label: "Highest Education", icon: GraduationCap, type: "text", placeholder: "e.g. B.Tech in CSE" },
    { key: "skills", label: "Key Skills", icon: Sparkles, type: "text", placeholder: "React, JavaScript, Node.js", fullWidth: true },
    { key: "bio", label: "About / Summary", icon: FileText, type: "textarea", placeholder: "A short summary about your professional background...", fullWidth: true },
    { key: "linkedin", label: "LinkedIn URL", icon: Link2, type: "url", placeholder: "https://linkedin.com/in/username" },
    { key: "portfolio", label: "Portfolio / GitHub URL", icon: Globe, type: "url", placeholder: "https://github.com/username" },
    { key: "resumeLink", label: "Resume Link", icon: ExternalLink, type: "url", placeholder: "Link to your uploaded resume" },
];

const buildFormState = (user) => {
    const state = {};
    PROFILE_FIELDS.forEach(({ key }) => {
        state[key] = user?.[key] || "";
    });
    return state;
};

const getCompletion = (values) => {
    const filled = PROFILE_FIELDS.filter(({ key }) => (values[key] || "").toString().trim() !== "").length;
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
};

const Profile = () => {
    const { user, updateProfile } = useAuth();

    const [form, setForm] = useState(() => buildFormState(user));
    const [saved, setSaved] = useState(false);

    const percent = getCompletion(form);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // name & email are read-only here — don't write them back.
        const { name, email, ...editable } = form;
        updateProfile(editable);

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    let ringColor = "#dc2626";
    if (percent >= 90) ringColor = "#059669";
    else if (percent >= 60) ringColor = "#2563eb";
    else if (percent >= 30) ringColor = "#d97706";

    const ringStyle = {
        background: `conic-gradient(${ringColor} ${percent * 3.6}deg, #e5e7eb 0deg)`,
    };

    return (
        <div className="profile-page">
            <div className="profile-header-card">
                <div className="profile-ring" style={ringStyle}>
                    <div className="profile-ring-inner">
                        <span className="profile-ring-percent">{percent}%</span>
                        <span className="profile-ring-label">Complete</span>
                    </div>
                </div>

                <div className="profile-header-info">
                    <span className="profile-avatar-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                    <div>
                        <h1>{user?.name}</h1>
                        <p>{user?.email}</p>
                        <p className="profile-header-hint">
                            {percent < 100
                                ? "Complete your profile to stand out to recruiters."
                                : "Your professional profile is fully complete! 🎉"}
                        </p>
                    </div>
                </div>
            </div>

            <form className="profile-form-card" onSubmit={handleSubmit}>
                <h2>Professional Details</h2>
                <p className="profile-form-subtitle">
                    These are the details a professional/job-ready account is usually asked for.
                </p>

                <div className="profile-fields-grid">
                    {PROFILE_FIELDS.map(({ key, label, icon: Icon, type, placeholder, readOnly, fullWidth }) => (
                        <div
                            className={`profile-field${fullWidth ? " profile-field-full" : ""}`}
                            key={key}
                        >
                            <label htmlFor={key}>
                                <Icon size={14} /> {label}
                            </label>

                            {type === "textarea" ? (
                                <textarea
                                    id={key}
                                    rows={4}
                                    placeholder={placeholder}
                                    value={form[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    readOnly={readOnly}
                                />
                            ) : (
                                <input
                                    id={key}
                                    type={type}
                                    placeholder={placeholder}
                                    value={form[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    readOnly={readOnly}
                                    className={readOnly ? "profile-field-readonly" : ""}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="profile-form-actions">
                    {saved && <span className="profile-saved-msg">✓ Profile updated</span>}
                    <button type="submit" className="profile-save-btn">
                        <Save size={16} /> Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;

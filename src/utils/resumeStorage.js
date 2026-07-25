const STORAGE_KEY = "resume_builder_resumes";
const ACTIVE_KEY = "resume_builder_active_id";

export const emptyResume = () => ({
    id: `resume_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: "Untitled Resume",
    templateId: 1,
    targetRole: "",
    personal: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

const readAll = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read resumes:", err);
        return [];
    }
};

const writeAll = (resumes) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
        return true;
    } catch (err) {
        console.error("Failed to save resumes:", err);
        return false;
    }
};

export const getAllResumes = () => {
    return readAll().sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
};

export const getResumeById = (id) => {
    return readAll().find((r) => r.id === id) || null;
};

export const saveResume = (resume) => {
    const resumes = readAll();
    const index = resumes.findIndex((r) => r.id === resume.id);

    const updated = {
        ...resume,
        updatedAt: new Date().toISOString(),
    };

    if (index === -1) {
        resumes.push(updated);
    } else {
        resumes[index] = updated;
    }

    writeAll(resumes);
    return updated;
};

export const deleteResume = (id) => {
    const resumes = readAll().filter((r) => r.id !== id);
    return writeAll(resumes);
};

export const duplicateResume = (id) => {
    const original = getResumeById(id);
    if (!original) return null;

    const copy = {
        ...original,
        id: `resume_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        title: `${original.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const resumes = readAll();
    resumes.push(copy);
    writeAll(resumes);
    return copy;
};

export const setActiveResumeId = (id) => {
    try {
        localStorage.setItem(ACTIVE_KEY, id);
    } catch (err) {
        console.error("Failed to set active resume:", err);
    }
};

export const getActiveResumeId = () => {
    try {
        return localStorage.getItem(ACTIVE_KEY);
    } catch (err) {
        return null;
    }
};

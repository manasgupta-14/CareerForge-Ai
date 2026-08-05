import { getCurrentUser } from "./authStorage";

const BASE_KEY = "resume_builder_resumes";
const BASE_ACTIVE_KEY = "resume_builder_active_id";

const storageKey = () => {
    const user = getCurrentUser();
    return user ? `${BASE_KEY}_${user.id}` : null;
};

const activeStorageKey = () => {
    const user = getCurrentUser();
    return user ? `${BASE_ACTIVE_KEY}_${user.id}` : null;
};

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
    const key = storageKey();
    if (!key) return [];

    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read resumes:", err);
        return [];
    }
};

const writeAll = (resumes) => {
    const key = storageKey();
    if (!key) return false;

    try {
        localStorage.setItem(key, JSON.stringify(resumes));
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
    if (!storageKey()) return resume;

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
    const key = activeStorageKey();
    if (!key) return;

    try {
        localStorage.setItem(key, id);
    } catch (err) {
        console.error("Failed to set active resume:", err);
    }
};

export const getActiveResumeId = () => {
    const key = activeStorageKey();
    if (!key) return null;

    try {
        return localStorage.getItem(key);
    } catch (err) {
        return null;
    }
};

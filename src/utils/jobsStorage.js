import { getCurrentUser } from "./authStorage";

const APPLIED_BASE_KEY = "applied_jobs";
const SAVED_KEY = "saved_jobs"; 

const appliedKey = () => {
    const user = getCurrentUser();
    return user ? `${APPLIED_BASE_KEY}_${user.id}` : null;
};

const readApplied = () => {
    const key = appliedKey();
    if (!key) return [];

    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read applied jobs:", err);
        return [];
    }
};

const writeApplied = (applications) => {
    const key = appliedKey();
    if (!key) return false;

    try {
        localStorage.setItem(key, JSON.stringify(applications));
        return true;
    } catch (err) {
        console.error("Failed to save applied jobs:", err);
        return false;
    }
};

export const getAppliedJobs = () => {
    return readApplied().sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
};

export const hasAppliedTo = (jobId) => {
    return readApplied().some((a) => a.jobId === jobId);
};

export const applyToJob = ({ jobId, title, company }) => {
    if (!appliedKey()) return null;

    const applications = readApplied();
    if (applications.some((a) => a.jobId === jobId)) {
        return applications.find((a) => a.jobId === jobId);
    }

    const newApplication = {
        id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        jobId,
        title,
        company,
        appliedAt: new Date().toISOString(),
    };

    applications.push(newApplication);
    writeApplied(applications);

    return newApplication;
};

export const removeAppliedJob = (jobId) => {
    const key = appliedKey();
    if (!key) return false;

    const remaining = readApplied().filter((a) => a.jobId !== jobId);
    return writeApplied(remaining);
};

export const clearAppliedJobs = () => {
    const key = appliedKey();
    if (!key) return false;

    return writeApplied([]);
};

const readSaved = () => {
    try {
        const raw = localStorage.getItem(SAVED_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read saved jobs:", err);
        return [];
    }
};

const writeSaved = (saved) => {
    try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
        return true;
    } catch (err) {
        console.error("Failed to save saved jobs:", err);
        return false;
    }
};

export const getSavedJobs = () => readSaved();

export const isJobSaved = (jobId) => readSaved().some((j) => j.jobId === jobId);

export const toggleSaveJob = ({ jobId, title, company }) => {
    const saved = readSaved();
    const exists = saved.some((j) => j.jobId === jobId);

    if (exists) {
        writeSaved(saved.filter((j) => j.jobId !== jobId));
        return false;
    }

    saved.push({ jobId, title, company, savedAt: new Date().toISOString() });
    writeSaved(saved);
    return true;
};

export const removeSavedJob = (jobId) => {
    return writeSaved(readSaved().filter((j) => j.jobId !== jobId));
};

export const clearSavedJobs = () => {
    return writeSaved([]);
};

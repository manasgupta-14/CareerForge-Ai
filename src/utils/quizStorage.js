import { getCurrentUser } from "./authStorage";

const BASE_KEY = "quiz_attempts";

const storageKey = () => {
    const user = getCurrentUser();
    return user ? `${BASE_KEY}_${user.id}` : null;
};

const readAll = () => {
    const key = storageKey();
    if (!key) return [];

    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read quiz attempts:", err);
        return [];
    }
};

const writeAll = (attempts) => {
    const key = storageKey();
    if (!key) return false;

    try {
        localStorage.setItem(key, JSON.stringify(attempts));
        return true;
    } catch (err) {
        console.error("Failed to save quiz attempts:", err);
        return false;
    }
};

export const getAllAttempts = () => {
    return readAll().sort((a, b) => new Date(b.takenAt) - new Date(a.takenAt));
};

export const getAttemptsByCategory = (category) => {
    return getAllAttempts().filter((a) => a.category === category);
};

export const getBestAttempt = (category) => {
    const attempts = getAttemptsByCategory(category);
    if (!attempts.length) return null;
    return attempts.reduce((best, a) =>
        a.score / a.total > best.score / best.total ? a : best
    );
};

export const saveAttempt = ({ category, score, total, answers }) => {
    if (!storageKey()) return null;

    const attempts = readAll();

    const newAttempt = {
        id: `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        category,
        score,
        total,
        answers,
        takenAt: new Date().toISOString(),
    };

    attempts.push(newAttempt);
    writeAll(attempts);

    return newAttempt;
};

export const clearAttempts = (category) => {
    if (!category) return writeAll([]);
    const remaining = readAll().filter((a) => a.category !== category);
    return writeAll(remaining);
};

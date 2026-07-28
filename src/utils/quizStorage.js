const STORAGE_KEY = "quiz_attempts";

const readAll = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read quiz attempts:", err);
        return [];
    }
};

const writeAll = (attempts) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
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

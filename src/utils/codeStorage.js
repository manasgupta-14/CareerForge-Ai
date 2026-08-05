import { getCurrentUser } from "./authStorage";

const BASE_KEY = "code_editor_snippets";

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
        console.error("Failed to read saved snippets:", err);
        return [];
    }
};

const writeAll = (snippets) => {
    const key = storageKey();
    if (!key) return false;

    try {
        localStorage.setItem(key, JSON.stringify(snippets));
        return true;
    } catch (err) {
        console.error("Failed to save snippets:", err);
        return false;
    }
};

export const getAllSnippets = () => {
    return readAll().sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
};

export const getSnippetsByType = (type) => {
    return getAllSnippets().filter((s) => s.type === type);
};

export const getSnippetById = (id) => {
    return readAll().find((s) => s.id === id) || null;
};

export const saveSnippet = ({ type, title, data }) => {
    if (!storageKey()) return null;

    const snippets = readAll();

    const newSnippet = {
        id: `snip_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type,
        title: title?.trim() || "Untitled",
        data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    snippets.push(newSnippet);
    writeAll(snippets);

    return newSnippet;
};

export const updateSnippet = (id, { title, data }) => {
    const snippets = readAll();
    const index = snippets.findIndex((s) => s.id === id);

    if (index === -1) return null;

    snippets[index] = {
        ...snippets[index],
        ...(title !== undefined ? { title: title.trim() || "Untitled" } : {}),
        ...(data !== undefined ? { data } : {}),
        updatedAt: new Date().toISOString(),
    };

    writeAll(snippets);
    return snippets[index];
};

export const deleteSnippet = (id) => {
    const snippets = readAll().filter((s) => s.id !== id);
    return writeAll(snippets);
};

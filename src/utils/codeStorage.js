const STORAGE_KEY = "code_editor_snippets";

// Read all snippets from localStorage
const readAll = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read saved snippets:", err);
        return [];
    }
};

// Persist all snippets to localStorage
const writeAll = (snippets) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
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

// data shape depends on editor type:
// html-css -> { html, css }
// javascript -> { code }
// react -> { code }
export const saveSnippet = ({ type, title, data }) => {
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

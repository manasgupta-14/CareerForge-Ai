const USERS_KEY = "cf_users";
const SESSION_KEY = "cf_current_user";

const readUsers = () => {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to read users:", err);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    } catch (err) {
        console.error("Failed to save users:", err);
        return false;
    }
};

const stripPassword = (user) => {
    if (!user) return null;
    const { password, ...safe } = user;
    return safe;
};

export const registerUser = ({ name, email, password }) => {
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedName = (name || "").trim();

    if (!trimmedName || !trimmedEmail || !password) {
        return { success: false, message: "Please fill in all fields." };
    }

    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters." };
    }

    const users = readUsers();
    const exists = users.some((u) => u.email === trimmedEmail);

    if (exists) {
        return {
            success: false,
            message: "An account with this email already exists. Please login instead.",
        };
    }

    const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: trimmedName,
        email: trimmedEmail,
        password,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    return { success: true, user: stripPassword(newUser) };
};

export const loginUser = ({ email, password }) => {
    const trimmedEmail = (email || "").trim().toLowerCase();
    const users = readUsers();
    const found = users.find((u) => u.email === trimmedEmail);

    if (!found) {
        return {
            success: false,
            message: "No account found with this email. Please register first.",
        };
    }

    if (found.password !== password) {
        return { success: false, message: "Incorrect password. Please try again." };
    }

    setCurrentUser(found);

    return { success: true, user: stripPassword(found) };
};

export const setCurrentUser = (user) => {
    try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(stripPassword(user)));
    } catch (err) {
        console.error("Failed to set session:", err);
    }
};

export const getCurrentUser = () => {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        return null;
    }
};

export const logoutUser = () => {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (err) {
        console.error("Failed to clear session:", err);
    }
};

export const updateUserProfile = (userId, updates) => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);

    if (idx === -1) {
        return { success: false, message: "User not found." };
    }

    const updatedUser = { ...users[idx], ...updates };
    users[idx] = updatedUser;
    writeUsers(users);

    const current = getCurrentUser();
    if (current && current.id === userId) {
        setCurrentUser(updatedUser);
    }

    return { success: true, user: stripPassword(updatedUser) };
};

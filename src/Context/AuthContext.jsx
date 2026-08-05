import { createContext, useContext, useState, useCallback } from "react";

import {
    getCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getCurrentUser());

    const login = useCallback(({ email, password }) => {
        const result = loginUser({ email, password });

        if (result.success) {
            setUser(result.user);
        }

        return result;
    }, []);

    const register = useCallback(({ name, email, password }) => {
        return registerUser({ name, email, password });
    }, []);

    const logout = useCallback(() => {
        logoutUser();
        setUser(null);
    }, []);

    const updateProfile = useCallback((updates) => {
        if (!user) return { success: false, message: "Not logged in." };

        const result = updateUserProfile(user.id, updates);
        if (result.success) {
            setUser(result.user);
        }
        return result;
    }, [user]);

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return ctx;
};

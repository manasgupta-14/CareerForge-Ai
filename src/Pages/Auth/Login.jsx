import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const successMessage = location.state?.registered
        ? "Account created! Please login to continue."
        : "";

    const [form, setForm] = useState({
        email: location.state?.email || "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password) {
            setError("Please fill in both fields.");
            return;
        }

        const result = login({ email: form.email, password: form.password });

        if (!result.success) {
            setError(result.message);
            return;
        }

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-head">
                    <div className="auth-icon">
                        <LogIn size={24} />
                    </div>
                    <h1>Welcome back</h1>
                    <p>Login to access your resumes, saved code & quiz history.</p>
                </div>

                {successMessage && (
                    <div className="auth-success">{successMessage}</div>
                )}

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <div className="auth-input-group">
                        <Mail size={16} />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className="auth-input-group">
                        <Lock size={16} />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="auth-eye-btn"
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        Login
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

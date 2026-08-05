import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = register({
            name: form.name,
            email: form.email,
            password: form.password,
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/login", {
            replace: true,
            state: { registered: true, email: form.email.trim().toLowerCase() },
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-head">
                    <div className="auth-icon">
                        <UserPlus size={24} />
                    </div>
                    <h1>Create your account</h1>
                    <p>Register to save resumes, code snippets & track quiz scores.</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <div className="auth-input-group">
                        <User size={16} />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </div>

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
                            placeholder="At least 6 characters"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
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

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="auth-input-group">
                        <Lock size={16} />
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        Register
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

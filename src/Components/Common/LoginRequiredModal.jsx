import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, X } from "lucide-react";

import "./LoginRequiredModal.css";

const LoginRequiredModal = ({ message, onCancel }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const goTo = (path) => {
        navigate(path, { state: { from: location.pathname } });
    };

    return (
        <div className="login-required-overlay" onClick={onCancel}>
            <div className="login-required-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="login-required-close"
                    onClick={onCancel}
                    type="button"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                <div className="login-required-icon">
                    <LogIn size={26} />
                </div>

                <h3>Login required</h3>
                <p>{message || "Please login or create an account to continue."}</p>

                <div className="login-required-actions">
                    <button
                        className="login-required-btn login-required-btn-outline"
                        onClick={() => goTo("/register")}
                        type="button"
                    >
                        Register
                    </button>
                    <button
                        className="login-required-btn login-required-btn-solid"
                        onClick={() => goTo("/login")}
                        type="button"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;

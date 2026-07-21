import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <header className="header">

            <div className="container">

                <Link to="/" className="logo">
                    Career<span>Forge</span> AI
                </Link>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
  
                    <Link to="/jobs">Jobs</Link>

                    <Link to="/resume-builder">
                        AI Resume Builder
                    </Link>

                    <Link to="/code-editor">
                        Online Code Editor
                    </Link>

                    <Link to="/quiz">Quiz</Link>

                    <Link to="/about">About</Link>

                    <Link to="/contact">Contact</Link>
                </nav>

                <div className="auth-buttons">
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>

                    <Link to="/register" className="register-btn">
                        Register
                    </Link>
                </div>

            </div>

        </header>
    );
};

export default Navbar;
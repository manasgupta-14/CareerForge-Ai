import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    ChevronDown,
    BriefcaseBusiness,
    UserCircle2,
    LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");

    const navRef = useRef(null);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/");
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setActiveDropdown("");
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);

        if (menuOpen) {
            setActiveDropdown("");
        }
    };

    const toggleDropdown = (name) => {
        if (window.innerWidth > 1100) return;

        setActiveDropdown((prev) =>
            prev === name ? "" : name
        );
    };

    useEffect(() => {

        const handleOutsideClick = (e) => {

            if (
                navRef.current &&
                !navRef.current.contains(e.target)
            ) {
                closeMenu();
            }

        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };

    }, []);

    useEffect(() => {

        const handleEscape = (e) => {

            if (e.key === "Escape") {
                closeMenu();
            }

        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, []);

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth > 1100) {
                setMenuOpen(false);
                setActiveDropdown("");
            }

        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };

    }, []);

    return (
        <header className="header">

            <div
                className="container"
                ref={navRef}
            >

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    <BriefcaseBusiness size={28} />

                    <span className="logo-text">
                        Career<span>Forge</span> AI
                    </span>
                </Link>

                <nav
                    className={
                        menuOpen
                            ? "nav-links active"
                            : "nav-links"
                    }
                >

                    <ul>

                        <li>

                            <NavLink
                                to="/"
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>

                        </li>

                        <li
                            className={`dropdown ${activeDropdown === "jobs"
                                ? "open"
                                : ""
                                }`}
                        >

                            <button
                                type="button"
                                className="dropdown-title"
                                onClick={() =>
                                    toggleDropdown("jobs")
                                }
                            >
                                Jobs

                                <ChevronDown size={16} />
                            </button>

                            <div className="dropdown-menu">

                                <NavLink
                                    to="/jobs/apply-jobs"
                                    onClick={closeMenu}
                                >
                                    Apply Jobs
                                </NavLink>

                                <NavLink
                                    to="/jobs/internship"
                                    onClick={closeMenu}
                                >
                                    Internship
                                </NavLink>

                                <NavLink
                                    to="/jobs/work-from-home"
                                    onClick={closeMenu}
                                >
                                    Work From Home
                                </NavLink>

                            </div>

                        </li>

                        <li
                            className={`dropdown ${activeDropdown === "resume"
                                ? "open"
                                : ""
                                }`}
                        >

                            <button
                                type="button"
                                className="dropdown-title"
                                onClick={() =>
                                    toggleDropdown("resume")
                                }
                            >
                                Resume Builder

                                <ChevronDown size={16} />
                            </button>

                            <div className="dropdown-menu">

                                <NavLink
                                    to="/resume-builder/create"
                                    onClick={closeMenu}
                                >
                                    Create Resume
                                </NavLink>

                                {isAuthenticated && (
                                    <NavLink
                                        to="/resume-builder/my-resumes"
                                        onClick={closeMenu}
                                    >
                                        My Resumes
                                    </NavLink>
                                )}

                                <NavLink
                                    to="/resume-builder/templates"
                                    onClick={closeMenu}
                                >
                                    Resume Templates
                                </NavLink>

                                <NavLink
                                    to="/resume-builder/ats-score"
                                    onClick={closeMenu}
                                >
                                    ATS Score
                                </NavLink>

                                <NavLink
                                    to="/resume-builder/ai-suggestions"
                                    onClick={closeMenu}
                                >
                                    AI Suggestions
                                </NavLink>

                                <NavLink
                                    to="/resume-builder/analyzer"
                                    onClick={closeMenu}
                                >
                                    Resume Analyzer
                                </NavLink>

                            </div>

                        </li>

                        <li
                            className={`dropdown ${activeDropdown === "editor"
                                ? "open"
                                : ""
                                }`}
                        >

                            <button
                                type="button"
                                className="dropdown-title"
                                onClick={() =>
                                    toggleDropdown("editor")
                                }
                            >
                                Code Editor

                                <ChevronDown size={16} />
                            </button>

                            <div className="dropdown-menu">

                                <NavLink
                                    to="/code-editor/html-css"
                                    onClick={closeMenu}
                                >
                                    HTML / CSS
                                </NavLink>

                                <NavLink
                                    to="/code-editor/javascript"
                                    onClick={closeMenu}
                                >
                                    JavaScript
                                </NavLink>

                                <NavLink
                                    to="/code-editor/react"
                                    onClick={closeMenu}
                                >
                                    React
                                </NavLink>

                                {isAuthenticated && (
                                    <NavLink
                                        to="/code-editor/saved"
                                        onClick={closeMenu}
                                    >
                                        Saved Codes
                                    </NavLink>
                                )}

                            </div>

                        </li>

                        <li
                            className={`dropdown ${activeDropdown === "quiz"
                                ? "open"
                                : ""
                                }`}
                        >
                            <button
                                type="button"
                                className="dropdown-title"
                                onClick={() => toggleDropdown("quiz")}
                            >
                                Quiz
                                <ChevronDown size={16} />
                            </button>

                            <div className="dropdown-menu">

                                <NavLink
                                    to="/quiz/html"
                                    onClick={closeMenu}
                                >
                                    HTML Quiz
                                </NavLink>

                                <NavLink
                                    to="/quiz/css"
                                    onClick={closeMenu}
                                >
                                    CSS Quiz
                                </NavLink>

                                <NavLink
                                    to="/quiz/javascript"
                                    onClick={closeMenu}
                                >
                                    JavaScript Quiz
                                </NavLink>

                                <NavLink
                                    to="/quiz/react"
                                    onClick={closeMenu}
                                >
                                    React Quiz
                                </NavLink>

                                <NavLink
                                    to="/quiz/mock-interview"
                                    onClick={closeMenu}
                                >
                                    Mock Interview
                                </NavLink>

                            </div>

                        </li>

                        <li>
                            <NavLink
                                to="/about"
                                onClick={closeMenu}
                            >
                                About
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                            >
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    <div className="mobile-buttons">

                        {isAuthenticated ? (
                            <div className="mobile-profile-block">
                                <div className="mobile-profile-name">
                                    <UserCircle2 size={20} />
                                    <span>{user?.name}</span>
                                </div>
                                <NavLink
                                    to="/profile"
                                    className="profile-dropdown-link"
                                    onClick={closeMenu}
                                >
                                    My Profile
                                </NavLink>
                                <button
                                    type="button"
                                    className="mobile-logout-btn"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="login-btn"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="register-btn"
                                    onClick={closeMenu}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}

                    </div>

                </nav>

                <div className="desktop-buttons">

                    {isAuthenticated ? (
                        <div className="profile-dropdown">
                            <Link to="/profile" className="profile-trigger">
                                <span className="profile-avatar">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                                <span className="profile-name">{user?.name}</span>
                                <ChevronDown size={15} />
                            </Link>

                            <div className="profile-dropdown-menu">
                                <div className="profile-dropdown-email">{user?.email}</div>

                                <Link to="/profile" className="profile-dropdown-link">
                                    My Profile
                                </Link>

                                {isAuthenticated && (
                                    <Link to="/resume-builder/my-resumes" className="profile-dropdown-link">
                                        My Resumes
                                    </Link>
                                )}

                                <Link to="/code-editor/saved" className="profile-dropdown-link">
                                    Saved Codes
                                </Link>

                                <button
                                    type="button"
                                    className="profile-dropdown-logout"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={15} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="login-btn"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="register-btn"
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>

                <button
                    type="button"
                    className="menu-icon"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? (
                        <X size={30} />
                    ) : (
                        <Menu size={30} />
                    )}
                </button>

            </div>

        </header>
    );
};

export default Navbar;
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Menu,
    X,
    ChevronDown,
    BriefcaseBusiness,
} from "lucide-react";

import "./Navbar.css";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");

    const navRef = useRef(null);

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

    // Close on outside click
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

    // Close on ESC
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

                {/* Logo */}

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

                {/* Navigation */}

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

                        {/* Jobs */}

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

                        {/* Resume */}

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

                                <NavLink
                                    to="/resume-builder/my-resumes"
                                    onClick={closeMenu}
                                >
                                    My Resumes
                                </NavLink>

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

                        {/* Code Editor */}

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

                                <NavLink
                                    to="/code-editor/saved"
                                    onClick={closeMenu}
                                >
                                    Saved Codes
                                </NavLink>

                            </div>

                        </li>
                        {/* Quiz */}

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

                        {/* About */}

                        <li>
                            <NavLink
                                to="/about"
                                onClick={closeMenu}
                            >
                                About
                            </NavLink>
                        </li>

                        {/* Contact */}

                        <li>
                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                            >
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    {/* Mobile Buttons */}

                    <div className="mobile-buttons">

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

                    </div>

                </nav>

                {/* Desktop Buttons */}

                <div className="desktop-buttons">

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

                </div>

                {/* Mobile Menu Icon */}

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
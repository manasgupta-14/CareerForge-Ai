import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <>
            <header className="header">
                <div className="container">
                    <Link to="/" className="logo">Carrer<span>Forge</span> AI</Link>

                    <nav className={menuOpen ? "nav-links active" : "nav-links"}>
                        <ul>

                            <li>
                                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            </li>

                            <li className="dropdown">
                                <Link onClick={() => setMenuOpen(false)}>Jobs ▾</Link>

                                <div className="dropdown-menu">

                                    <Link to="/jobs/apply-jobs">Apply Jobs</Link>

                                    <Link to="/jobs/internship">Internship</Link>

                                </div>
                            </li>

                            <li className="dropdown">

                                <Link >
                                    Resume Builder ▾
                                </Link>

                                <div className="dropdown-menu">

                                    <Link to="/resume-builder/create">Create Resume</Link>

                                    <Link to="/resume-builder/my-resumes">My Resumes</Link>

                                    <Link to="/resume-builder/templates">Resume Templates</Link>

                                    <Link to="/resume-builder/ats-score">ATS Score</Link>

                                    <Link to="/resume-builder/ai-suggestions">
                                        AI Suggestions
                                    </Link>

                                    <Link to="/resume-builder/analyzer">
                                        Resume Analyzer
                                    </Link>

                                </div>

                            </li>

                            <li className="dropdown">

                                <Link to="/code-editor">
                                    Code Editor ▾
                                </Link>

                                <div className="dropdown-menu">

                                    <Link to="/code-editor/html-css">
                                        HTML/CSS Editor
                                    </Link>

                                    <Link to="/code-editor/javascript">
                                        JavaScript Editor
                                    </Link>

                                    <Link to="/code-editor/react">
                                        React Editor
                                    </Link>

                                    <Link to="/code-editor/saved">
                                        Saved Codes
                                    </Link>

                                </div>

                            </li>

                            <li className="dropdown">

                                <Link to="/quiz">
                                    Quiz ▾
                                </Link>

                                <div className="dropdown-menu">

                                    <Link to="/quiz/html">HTML Quiz</Link>

                                    <Link to="/quiz/css">CSS Quiz</Link>

                                    <Link to="/quiz/javascript">JavaScript Quiz</Link>

                                    <Link to="/quiz/react">React Quiz</Link>

                                    <Link to="/quiz/mock-interview">
                                        Mock Interview
                                    </Link>

                                </div>

                            </li>

                            <li>
                                <Link to="/about">About</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>

                        </ul>

                        <div className="mobile-buttons">
                            <Link to="/login" className="login-btn">Login</Link>
                            <Link to="/register" className="register-btn">Register</Link>
                        </div>

                    </nav>

                    <div className="desktop-buttons">
                        <Link to="/login" className='login-btn'>Login</Link>
                        <Link to="/register" className='register-btn'>Register</Link>
                    </div>

                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? "✕" : "☰"}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
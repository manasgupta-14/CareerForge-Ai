import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Company */}

                <div className="footer-box">

                    <h2 className="footer-logo">
                        Career<span>Forge</span> AI
                    </h2>

                    <p>
                        CareerForge AI helps students and professionals find
                        jobs, build ATS-friendly resumes, practice coding,
                        and prepare for interviews—all in one platform.
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-box">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>

                </div>

                {/* AI Tools */}

                <div className="footer-box">

                    <h3>AI Tools</h3>

                    <Link to="/resume-builder">
                        Resume Builder
                    </Link>

                    <Link to="/resume-builder/ats-score">
                        ATS Score
                    </Link>

                    <Link to="/resume-builder/analyzer">
                        Resume Analyzer
                    </Link>

                    <Link to="/quiz">
                        Interview Quiz
                    </Link>

                </div>

                {/* Contact */}

                <div className="footer-box">

                    <h3>Contact</h3>

                    <p>📧 support@careerforgeai.com</p>

                    <p>📍 Noida, India</p>

                    <p>📞 +91 98765 43210</p>

                </div>

            </div>

            {/* Bottom */}

            <div className="footer-bottom">

                <p>
                    © 2026 CareerForge AI. All Rights Reserved.
                </p>

                <div className="social-links">

                    <a href="#">LinkedIn</a>

                    <a href="#">GitHub</a>

                    <a href="#">Instagram</a>

                    <a href="#">Twitter</a>

                </div>

            </div>

        </footer>
    );
};

export default Footer;  
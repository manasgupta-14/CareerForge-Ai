import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
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

                <div className="footer-box">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-box">

                    <h3>AI Tools</h3>

                    <span className="footer-link-disabled">
                        Resume Builder <em className="coming-soon-tag">Coming Soon</em>
                    </span>

                    <span className="footer-link-disabled">
                        ATS Score <em className="coming-soon-tag">Coming Soon</em>
                    </span>

                    <span className="footer-link-disabled">
                        Resume Analyzer <em className="coming-soon-tag">Coming Soon</em>
                    </span>

                    <Link to="/quiz">
                        Interview Quiz
                    </Link>
                </div>

                <div className="footer-box">
                    <h3>Contact</h3>
                    <p>📧 support@careerforgeai.com</p>
                    <p>📍 Noida, India</p>
                    <p>📞 +91 98765 43210</p>
                </div>
            </div>

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
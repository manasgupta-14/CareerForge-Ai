import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Briefcase,
    Building2,
    Users,
    Award,
    Sparkles,
    Target,
    ShieldCheck,
    Lightbulb,
    Globe,
    BookOpen,
    CheckCircle,
    Star,
    TrendingUp,
} from "lucide-react";

import "./About.css";
import Footer from "../../Components/Footer/Footer";

const About = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Briefcase size={30} />,
            title: "Smart Job Search",
            desc: "Discover thousands of verified jobs from top companies with advanced search and filtering."
        },
        {
            icon: <Sparkles size={30} />,
            title: "AI Resume Builder",
            desc: "Create ATS-friendly resumes in minutes using AI-powered suggestions."
        },
        {
            icon: <Building2 size={30} />,
            title: "Top Companies",
            desc: "Apply directly to trusted companies hiring across multiple industries."
        },
        {
            icon: <BookOpen size={30} />,
            title: "Career Resources",
            desc: "Access interview tips, career guidance, resume advice and learning materials."
        }
    ];

    const values = [
        {
            icon: <Target size={28} />,
            title: "Our Mission",
            desc: "Helping every student and professional find better career opportunities through modern technology."
        },
        {
            icon: <Lightbulb size={28} />,
            title: "Innovation",
            desc: "We continuously improve our platform using AI and the latest web technologies."
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Trust",
            desc: "We focus on verified companies, secure applications and transparent hiring."
        },
        {
            icon: <Globe size={28} />,
            title: "Accessibility",
            desc: "Career opportunities should be available to everyone regardless of location."
        }
    ];

    const stats = [
        {
            number: "10K+",
            title: "Jobs Posted"
        },
        {
            number: "500+",
            title: "Companies"
        },
        {
            number: "25K+",
            title: "Candidates"
        },
        {
            number: "95%",
            title: "Success Rate"
        }
    ];

    return (
        <div className="about-page">

            {/* ================= HERO ================= */}

            <section className="about-hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        <Sparkles size={16} />
                        ABOUT CAREERFORGE AI
                    </span>

                    <h1>
                        Empowering Careers With
                        <span> AI & Innovation</span>
                    </h1>

                    <p>
                        CareerForge AI is a modern career platform designed to connect
                        students, freshers and professionals with the right opportunities.
                        From AI Resume Builder to verified job listings, internships and
                        career resources, everything is available in one place.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/jobs")}
                        >
                            Explore Jobs
                            <ArrowRight size={18} />
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                        </button>

                    </div>

                </div>

                <div className="hero-image">

                    <div className="image-card">

                        <div className="floating-card">

                            <Users size={30} />

                            <div>
                                <h3>25,000+</h3>
                                <p>Active Users</p>
                            </div>

                        </div>

                        <div className="floating-card second">

                            <Award size={30} />

                            <div>
                                <h3>500+</h3>
                                <p>Hiring Companies</p>
                            </div>

                        </div>

                        <div className="circle one"></div>
                        <div className="circle two"></div>
                        <div className="circle three"></div>

                    </div>

                </div>

            </section>

            {/* ================= FEATURES ================= */}

            <section className="features-section">

                <div className="section-title">
                    <span>WHAT WE OFFER</span>
                    <h2>Everything You Need To Build Your Career</h2>
                    <p>
                        Whether you're searching for your first internship or your dream
                        job, CareerForge AI provides all the tools you need.
                    </p>
                </div>

                <div className="features-grid">

                    {features.map((item, index) => (

                        <div className="feature-card" key={index}>

                            <div className="feature-icon">
                                {item.icon}
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.desc}</p>

                        </div>

                    ))}

                </div>

            </section>

            {/* ================= ABOUT ================= */}

            <section className="about-section">

                <div className="about-left">

                    <span className="small-title">
                        WHO WE ARE
                    </span>

                    <h2>
                        Building Careers Through
                        Smart Technology
                    </h2>

                    <p>
                        CareerForge AI is more than just a job portal. We combine
                        Artificial Intelligence with modern recruitment solutions to help
                        candidates prepare resumes, discover opportunities and connect
                        with trusted employers.
                    </p>

                    <p>
                        Our goal is to simplify the hiring journey by providing a single
                        platform where candidates can search jobs, create professional
                        resumes, learn new skills and grow their careers confidently.
                    </p>

                    <div className="about-list">

                        <div>
                            <CheckCircle size={18} />
                            AI Powered Resume Builder
                        </div>

                        <div>
                            <CheckCircle size={18} />
                            Verified Companies
                        </div>

                        <div>
                            <CheckCircle size={18} />
                            Internship Opportunities
                        </div>

                        <div>
                            <CheckCircle size={18} />
                            Career Guidance
                        </div>

                    </div>

                </div>

                <div className="about-right">

                    <div className="experience-box">

                        <TrendingUp size={45} />

                        <h2>5+</h2>

                        <p>
                            Years Of Innovation
                        </p>

                    </div>

                </div>

            </section>
            {/* ================= VALUES ================= */}

            <section className="values-section">

                <div className="section-title">

                    <span>OUR VALUES</span>

                    <h2>
                        Why Thousands Trust CareerForge AI
                    </h2>

                    <p>
                        We believe technology should simplify career growth and create
                        opportunities for everyone.
                    </p>

                </div>

                <div className="values-grid">

                    {values.map((item, index) => (

                        <div className="value-card" key={index}>

                            <div className="value-icon">
                                {item.icon}
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.desc}</p>

                        </div>

                    ))}

                </div>

            </section>

            {/* ================= STATS ================= */}

            <section className="stats-section">

                <div className="section-title">

                    <span>OUR ACHIEVEMENTS</span>

                    <h2>
                        Numbers That Speak For Us
                    </h2>

                </div>

                <div className="stats-grid">

                    {stats.map((item, index) => (

                        <div
                            className="stat-card"
                            key={index}
                        >

                            <h2>{item.number}</h2>

                            <p>{item.title}</p>

                        </div>

                    ))}

                </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="cta-section">

                <div className="cta-box">

                    <Star
                        className="cta-star"
                        size={45}
                    />

                    <h2>
                        Ready To Build Your Dream Career?
                    </h2>

                    <p>
                        Join thousands of students and professionals who are already using
                        CareerForge AI to discover jobs, internships and career
                        opportunities.
                    </p>

                    <div className="cta-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/register")}
                        >
                            Create Free Account
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                        </button>

                    </div>

                </div>

            </section>

                    <Footer/>
        </div>
    );
};

export default About;
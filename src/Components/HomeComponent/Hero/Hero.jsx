import "./Hero.css"
import React from 'react'
import hero from "../../../assets/hero.jpg"

const Hero = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">
                           🚀 AI Powered Carrer Platform
                        </span>

                        <h1>
                            Find <span>Dream Job</span>Faster with CareerForge AI
                        </h1>

                        <p>
                            Discover thousands of verified job opportunities from top
                            companies. Build ATS-friendly resumes, prepare for interviews,
                            and level up your career with AI.
                        </p>

                        <div className="hero-search">
                            <input type="text"
                                placeholder="Job Title (React Developer)" />

                            <input type="text"
                                placeholder="Location" />

                            <button>
                                Search Jobs
                            </button>
                        </div>

                        <div className="hero-tags">
                            <span>React</span>
                            <span>Java</span>
                            <span>Python</span>
                            <span>Remote</span>
                            <span>Internship</span>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={hero}
                            alt="Career" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
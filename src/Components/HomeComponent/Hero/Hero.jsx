import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">

            <div className="hero-container">

                {/* Left Content */}

                <div className="hero-content">

                    <span className="hero-badge">
                        🚀 AI Powered Career Platform
                    </span>

                    <h1>
                        Find Your <span>Dream Job</span> Faster with CareerForge AI
                    </h1>

                    <p>
                        Discover thousands of verified job opportunities from top
                        companies. Build ATS-friendly resumes, prepare for interviews,
                        and level up your career with AI.
                    </p>

                    {/* Search */}

                    <div className="hero-search">

                        <input
                            type="text"
                            placeholder="Job Title (React Developer)"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                        />

                        <button>
                            Search Jobs
                        </button>

                    </div>

                    {/* Popular Tags */}

                    <div className="hero-tags">

                        <span>React</span>
                        <span>Java</span>
                        <span>Python</span>
                        <span>Remote</span>
                        <span>Internship</span>

                    </div>

                </div>

                {/* Right Content */}

                <div className="hero-image">

                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
                        alt="Career"
                    />

                </div>

            </div>

        </section>
    );
};

export default Hero;
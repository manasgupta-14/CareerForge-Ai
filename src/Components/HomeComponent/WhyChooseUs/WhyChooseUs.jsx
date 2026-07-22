import "./WhyChooseUs.css";

const features = [
    {
        icon: "✅",
        title: "Verified Jobs",
        description:
            "Browse genuine and verified job opportunities from trusted companies.",
    },
    {
        icon: "🤖",
        title: "AI Resume Builder",
        description:
            "Create professional ATS-friendly resumes in minutes with AI assistance.",
    },
    {
        icon: "📊",
        title: "ATS Resume Score",
        description:
            "Analyze your resume and improve its ATS compatibility before applying.",
    },
    {
        icon: "💻",
        title: "Online Code Editor",
        description:
            "Practice coding online with our built-in code editor for interviews.",
    },
    {
        icon: "🧠",
        title: "Interview Preparation",
        description:
            "Prepare with quizzes, coding challenges, and interview questions.",
    },
    {
        icon: "🚀",
        title: "Easy Apply",
        description:
            "Apply to your dream jobs quickly with a simple and user-friendly process.",
    },
];

const WhyChoose = () => {
    return (
        <section className="why-choose">

            <div className="why-heading">

                <span>WHY CHOOSE US</span>

                <h2>Why Choose CareerForge AI?</h2>

                <p>
                    Everything you need to build your career in one platform. Search jobs,
                    build ATS-friendly resumes, practice coding, and prepare for interviews.
                </p>

            </div>

            <div className="why-grid">

                {features.map((feature, index) => (
                    <div className="why-card" key={index}>

                        <div className="why-icon">
                            {feature.icon}
                        </div>

                        <h3>{feature.title}</h3>

                        <p>{feature.description}</p>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default WhyChoose;
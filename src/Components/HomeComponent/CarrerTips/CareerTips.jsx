import "./CareerTips.css";

const tips = [
    {
        image: "https://picsum.photos/400/250?random=11",
        title: "Top 10 React Interview Questions",
        description:
            "Prepare for your React interviews with the most commonly asked questions and answers.",
        date: "15 July 2026",
        category: "React",
    },
    {
        image: "https://picsum.photos/400/250?random=12",
        title: "How to Build an ATS Friendly Resume",
        description:
            "Learn how to create an ATS-optimized resume that increases your chances of getting shortlisted.",
        date: "18 July 2026",
        category: "Resume",
    },
    {
        image: "https://picsum.photos/400/250?random=13",
        title: "Freshers Interview Preparation Guide",
        description:
            "Essential tips to crack your first technical interview with confidence.",
        date: "20 July 2026",
        category: "Career",
    },
];

const CareerTips = () => {
    return (
        <section className="career-tips">

            <div className="career-heading">
                <span>CAREER RESOURCES</span>

                <h2>Career Tips & Learning Resources</h2>

                <p>
                    Improve your skills, build better resumes, and prepare for interviews
                    with our latest career guidance articles.
                </p>
            </div>

            <div className="tips-container">

                {tips.map((tip, index) => (
                    <div className="tip-card" key={index}>

                        <img src={tip.image} alt={tip.title} />

                        <div className="tip-content">

                            <div className="tip-info">
                                <span>{tip.category}</span>
                                <small>{tip.date}</small>
                            </div>

                            <h3>{tip.title}</h3>

                            <p>{tip.description}</p>

                            <button>Read More →</button>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default CareerTips;
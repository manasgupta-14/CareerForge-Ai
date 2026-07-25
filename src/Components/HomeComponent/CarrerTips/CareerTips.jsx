import { useEffect, useState } from "react";
import "./CareerTips.css";
import carrer_tips from "../../../API/carrerTipsHome";

const CareerTips = () => {
    const [carrerTips, setCarrerTips] = useState([]);

    useEffect(() => {
        setCarrerTips()
    })
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
                {carrer_tips.map((tip, index) => (
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
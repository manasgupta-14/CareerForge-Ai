import { useEffect, useState } from "react";
import "./WhyChooseUs.css";
import why_choose_us from "../../../API/whyChooseUsHome"

const WhyChoose = () => {
    const [whyChooseUs, setWhyChooseUs] = useState([]);

    useEffect(() => {
        setWhyChooseUs(why_choose_us);
    });

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
                {whyChooseUs.map((feature, index) => (
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
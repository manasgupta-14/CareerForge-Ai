import "./Testimonials.css";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Frontend Developer",
        company: "Infosys",
        image: "https://i.pravatar.cc/150?img=11",
        review:
            "CareerForge AI helped me create an ATS-friendly resume. Within two weeks, I got interview calls from multiple companies.",
        rating: "⭐⭐⭐⭐⭐",
    },
    {
        name: "Priya Verma",
        role: "Software Engineer",
        company: "TCS",
        image: "https://i.pravatar.cc/150?img=32",
        review:
            "The AI Resume Builder and Interview Quiz made my preparation much easier. I highly recommend this platform.",
        rating: "⭐⭐⭐⭐⭐",
    },
    {
        name: "Aman Gupta",
        role: "React Developer",
        company: "Wipro",
        image: "https://i.pravatar.cc/150?img=15",
        review:
            "I found my first internship through CareerForge AI. The platform is easy to use and packed with useful features.",
        rating: "⭐⭐⭐⭐⭐",
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials">

            <div className="testimonial-heading">

                <span>SUCCESS STORIES</span>

                <h2>What Our Users Say</h2>

                <p>
                    Thousands of job seekers trust CareerForge AI to build their careers.
                </p>

            </div>

            <div className="testimonial-grid">

                {testimonials.map((item, index) => (

                    <div className="testimonial-card" key={index}>

                        <div className="testimonial-rating">
                            {item.rating}
                        </div>

                        <p className="testimonial-review">
                            "{item.review}"
                        </p>

                        <div className="testimonial-user">

                            <img src={item.image} alt={item.name} />

                            <div>

                                <h3>{item.name}</h3>

                                <span>
                                    {item.role} • {item.company}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Testimonials;
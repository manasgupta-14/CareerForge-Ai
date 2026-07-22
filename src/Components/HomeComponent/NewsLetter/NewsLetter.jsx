import "./NewsLetter.css";

const NewsLetter = () => {
    return (
        <section className="newsletter">

            <div className="newsletter-container">

                <div className="newsletter-content">

                    <span>NEWSLETTER</span>

                    <h2>Get the Latest Job Alerts in Your Inbox</h2>

                    <p>
                        Subscribe to receive the latest job openings, career tips,
                        interview preparation guides, and AI-powered career updates
                        directly to your email.
                    </p>

                </div>

                <form className="newsletter-form">

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button type="submit">
                        Subscribe
                    </button>

                </form>

            </div>

        </section>
    );
};

export default NewsLetter;
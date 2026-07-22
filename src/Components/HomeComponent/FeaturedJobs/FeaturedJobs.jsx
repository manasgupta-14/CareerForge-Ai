import "./FeaturedJobs.css";

const jobs = [
    {
        company: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        title: "Frontend Developer",
        location: "Noida",
        salary: "₹8 - 12 LPA",
        experience: "1-3 Years",
        type: "Full Time",
    },
    {
        company: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        title: "React Developer",
        location: "Bengaluru",
        salary: "₹10 - 15 LPA",
        experience: "2+ Years",
        type: "Hybrid",
    },
    {
        company: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        title: "Software Engineer",
        location: "Hyderabad",
        salary: "₹12 - 18 LPA",
        experience: "1-4 Years",
        type: "Full Time",
    },
    {
        company: "Adobe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Adobe_Corporate_logo.svg",
        title: "UI/UX Designer",
        location: "Pune",
        salary: "₹7 - 11 LPA",
        experience: "1-2 Years",
        type: "Remote",
    },
    {
        company: "Infosys",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Infosys_logo.svg",
        title: "Backend Developer",
        location: "Noida",
        salary: "₹6 - 10 LPA",
        experience: "Fresher",
        type: "Full Time",
    },
    {
        company: "TCS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        title: "Java Developer",
        location: "Lucknow",
        salary: "₹5 - 9 LPA",
        experience: "Fresher",
        type: "Hybrid",
    },
];

const FeaturedJobs = () => {
    return (
        <section className="featured-jobs">

            <div className="featured-heading">

                <span>FEATURED JOBS</span>

                <h2>Latest Featured Opportunities</h2>

                <p>
                    Discover hand-picked jobs from top companies and apply instantly.
                </p>

            </div>

            <div className="jobs-grid">

                {jobs.map((job, index) => (

                    <div className="job-card" key={index}>

                        <div className="company-info">

                            <img src={job.logo} alt={job.company} />

                            <div>
                                <h3>{job.title}</h3>
                                <span>{job.company}</span>
                            </div>

                        </div>

                        <div className="job-details">

                            <p>📍 {job.location}</p>

                            <p>💰 {job.salary}</p>

                            <p>💼 {job.experience}</p>

                            <p>🕒 {job.type}</p>

                        </div>

                        <button>Apply Now</button>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default FeaturedJobs;
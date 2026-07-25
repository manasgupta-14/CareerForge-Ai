import { useEffect, useState } from "react";
import "./FeaturedJobs.css";
import featured_Jobs from "../../../API/featuredJobsHome";


const FeaturedJobs = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);

    useEffect(() => {
        setFeaturedJobs(featuredJobs);
    }, [])
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

                {featured_Jobs.map((job) => (

                    <div className="job-card" key={job.id}>

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
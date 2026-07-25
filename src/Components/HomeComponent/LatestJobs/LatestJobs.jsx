import { useEffect, useState } from "react";
import "./LatestJobs.css";
import latest_Jobs from "../../../API/latestJobsHome";

const LatestJobs = () => {
    const [latestJobs, setLatestJobs] = useState([]);

    useEffect(()=>{
        setLatestJobs(latest_Jobs)
    })
    
    return (
        <section className="latest-jobs">

            <div className="latest-heading">
                <span>LATEST JOBS</span>

                <h2>Recently Posted Jobs</h2>

                <p>
                    Stay updated with the newest opportunities from top companies.
                </p>
            </div>

            <div className="latest-container">

                {latestJobs.map((job, index) => (

                    <div className="latest-card" key={index}>

                        <div className="job-left">

                            <h3>{job.title}</h3>

                            <p>{job.company}</p>

                        </div>

                        <div className="job-center">

                            <span>📍 {job.location}</span>

                            <span>💰 {job.salary}</span>

                            <span>🕒 {job.type}</span>

                        </div>

                        <div className="job-right">

                            <small>{job.posted}</small>

                            <button>Apply</button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default LatestJobs;
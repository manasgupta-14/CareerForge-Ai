import { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Filter,
    Home,
} from "lucide-react";

import workHomeData from "../../../API/workFromHome";
import "./WorkFromHome.css";
import Footer from "../../Footer/Footer";

const WorkFromHome = () => {

    const [workHomeJobs, setWorkHomeJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("All");

    useEffect(() => {
        setWorkHomeJobs(workHomeData);
    }, []);

    const filteredJobs = workHomeJobs.filter((job) => {

        const searchText = search.trim().toLowerCase();
        const locationText = location.trim().toLowerCase();

        const matchesSearch =
            searchText === "" ||
            job.title.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText);

        const matchesLocation =
            locationText === "" ||
            job.location.toLowerCase().includes(locationText);

        let matchesType = true;

        switch (jobType) {

            case "Remote":
                matchesType = job.type === "Remote";
                break;

            case "Full Time":
                matchesType = job.type === "Full Time";
                break;

            case "Part Time":
                matchesType = job.type === "Part Time";
                break;

            case "Hybrid":
                matchesType = job.type === "Hybrid";
                break;

            case "Fresher":
                matchesType = job.experience === "Freshers";
                break;

            default:
                matchesType = true;
        }

        return (
            matchesSearch &&
            matchesLocation &&
            matchesType
        );
    });

    return (
        <>
            <section className="work-home">

                <div className="work-home-hero">

                    <h1>Find Your Perfect Work From Home Job</h1>

                    <p>
                        Explore thousands of remote jobs from top companies,
                        work from anywhere, and build your dream career.
                    </p>

                    <div className="search-box">

                        <div className="input-box">
                            <Search size={20} />

                            <input
                                type="text"
                                placeholder="Search Remote Jobs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="input-box">
                            <MapPin size={20} />

                            <input
                                type="text"
                                placeholder="Preferred Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <button className="search-btn">
                            Search Jobs
                        </button>

                    </div>

                    <div className="filter-buttons">
                        <button
                            className={jobType === "All" ? "active-filter" : ""}
                            onClick={() => setJobType("All")}
                        >
                            <Filter size={18} />
                            All Jobs
                        </button>

                        <button
                            className={jobType === "Remote" ? "active-filter" : ""}
                            onClick={() => setJobType("Remote")}
                        >
                            <Home size={18} />
                            Remote
                        </button>

                        <button
                            className={jobType === "Full Time" ? "active-filter" : ""}
                            onClick={() => setJobType("Full Time")}
                        >
                            Full Time
                        </button>

                        <button
                            className={jobType === "Part Time" ? "active-filter" : ""}
                            onClick={() => setJobType("Part Time")}
                        >
                            Part Time
                        </button>

                        <button
                            className={jobType === "Hybrid" ? "active-filter" : ""}
                            onClick={() => setJobType("Hybrid")}
                        >
                            Hybrid
                        </button>

                        <button
                            className={jobType === "Fresher" ? "active-filter" : ""}
                            onClick={() => setJobType("Fresher")}
                        >
                            Freshers
                        </button>

                    </div>

                </div>

                <div className="work-home-container">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div
                                className="work-home-card"
                                key={job.id}
                            >

                                <div className="work-home-header">
                                    <div className="company-logo">
                                        <BriefcaseBusiness size={32} />
                                    </div>

                                    <div className="company-info">
                                        <h2>{job.title}</h2>
                                        <h4>{job.company}</h4>
                                    </div>

                                </div>

                                <div className="work-home-details">
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <span>{job.location}</span>
                                    </div>

                                    <div className="detail-item">
                                        <Home size={18} />
                                        <span>{job.type}</span>
                                    </div>

                                </div>

                                <div className="work-home-extra">
                                    <div>
                                        <h5>Salary</h5>
                                        <p>{job.salary}</p>
                                    </div>

                                    <div>
                                        <h5>Experience</h5>
                                        <p>{job.experience}</p>
                                    </div>
                                </div>

                                <div className="skills">
                                    {job.skills.map((skill, index) => (
                                        <span key={index}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="work-home-actions">

                                    <button className="apply-btn">
                                        Apply Now
                                    </button>

                                    <button className="save-btn">
                                        Save Job
                                    </button>

                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="no-job-found">
                            <h2>No Work From Home Jobs Found</h2>

                            <p>
                                Try searching with another keyword,
                                location or filter.
                            </p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default WorkFromHome;
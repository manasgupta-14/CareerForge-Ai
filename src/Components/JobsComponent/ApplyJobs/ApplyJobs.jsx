import React, { useEffect, useState } from 'react';
import jobData from "../../../API/applyJobsHome";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Filter,
} from "lucide-react";

import "./ApplyJobs.css";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const ApplyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("All");

    useEffect(() => {
        setJobs(jobData);
    }, []);

    const filteredJobs = jobs.filter((job) => {
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

            case "Internship":
                matchesType = job.type === "Internship";
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

        return matchesLocation && matchesSearch && matchesType;
    });

    return (
        <>
        <div className="apply-jobs">
            <div className="jobs-hero">
                <h1>Find Your Dream Job</h1>

                <p>
                    Search thousands of verified jobs from top companies
                    and apply with a single click.
                </p>

                <div className="search-box">
                    <div className="input-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Job Title, Company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <MapPin size={20} />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <button className="search-btn" type="button">
                        Search Jobs
                    </button>
                </div>

                <div className="filter-buttons">
                    <button
                        type="button"
                        className={jobType === "All" ? "active-filter" : ""}
                        onClick={() => setJobType("All")}
                    >
                        <Filter size={16} />
                        All Jobs
                    </button>

                    <button
                        type="button"
                        className={jobType === "Remote" ? "active-filter" : ""}
                        onClick={() => setJobType("Remote")}
                    >
                        Remote
                    </button>

                    <button
                        type="button"
                        className={jobType === "Full Time" ? "active-filter" : ""}
                        onClick={() => setJobType("Full Time")}
                    >
                        Full Time
                    </button>

                    <button
                        type="button"
                        className={jobType === "Part Time" ? "active-filter" : ""}
                        onClick={() => setJobType("Part Time")}
                    >
                        Part Time
                    </button>

                    <button
                        type="button"
                        className={jobType === "Internship" ? "active-filter" : ""}
                        onClick={() => setJobType("Internship")}
                    >
                        Internship
                    </button>

                    <button
                        type="button"
                        className={jobType === "Hybrid" ? "active-filter" : ""}
                        onClick={() => setJobType("Hybrid")}
                    >
                        Hybrid
                    </button>

                    <button
                        type="button"
                        className={jobType === "Fresher" ? "active-filter" : ""}
                        onClick={() => setJobType("Fresher")}
                    >
                        Fresher
                    </button>
                </div>
            </div>

            <div className="jobs-container">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div className="job-card" key={job.id}>
                            <div className="job-header">
                                <div className="company-logo">
                                    <BriefcaseBusiness size={18} />
                                </div>
                                <div className="company-info">
                                    <h2>{job.title}</h2>
                                    <h4>{job.company}</h4>
                                </div>
                            </div>

                            <div className="job-details">
                                <div className="detail-item">
                                    <MapPin size={18} />
                                    <span>{job.location}</span>
                                </div>

                                <div className="detail-item">
                                    <BriefcaseBusiness size={18} />
                                    <span>{job.type}</span>
                                </div>
                            </div>

                            <div className="job-extra">
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
                                {job.skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>

                            <div className="job-actions">
                                <button className="apply-btn" type="button">
                                    Apply Now
                                </button>
                                <button className="save-btn" type="button">
                                    Save Job
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-job-found">
                        <h2>No Jobs Found</h2>
                        <p>
                            Try searching with another keyword, location,
                            or choose a different filter.
                        </p>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>

    );
};

export default ApplyJobs;
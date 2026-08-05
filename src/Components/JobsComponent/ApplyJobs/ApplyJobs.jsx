import React, { useEffect, useState } from 'react';
import jobData from "../../../API/applyJobsHome";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Filter,
    CheckCircle2,
    Heart,
    History,
    LogIn,
    X,
    Trash2,
} from "lucide-react";

import "./ApplyJobs.css";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import LoginRequiredModal from '../../Common/LoginRequiredModal';
import { useAuth } from '../../../context/AuthContext';
import {
    getAppliedJobs,
    applyToJob,
    removeAppliedJob,
    clearAppliedJobs,
    getSavedJobs,
    toggleSaveJob,
    removeSavedJob,
    clearSavedJobs,
} from '../../../utils/jobsStorage';

const formatDateTime = (iso) => {
    try {
        return new Date(iso).toLocaleString(undefined, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
};

const ApplyJobs = () => {
    const { isAuthenticated } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("All");

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [congrats, setCongrats] = useState(null);

    useEffect(() => {
        setJobs(jobData);
    }, []);

    useEffect(() => {
        setAppliedJobs(isAuthenticated ? getAppliedJobs() : []);
    }, [isAuthenticated]);

    useEffect(() => {
        setSavedJobs(getSavedJobs());
    }, []);

    useEffect(() => {
        if (!congrats) return;
        const timer = setTimeout(() => setCongrats(null), 5000);
        return () => clearTimeout(timer);
    }, [congrats]);

    const appliedJobIds = new Set(appliedJobs.map((a) => a.jobId));
    const savedJobIds = new Set(savedJobs.map((s) => s.jobId));

    const handleApply = (job) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        if (appliedJobIds.has(job.id)) return;

        applyToJob({ jobId: job.id, title: job.title, company: job.company });
        setAppliedJobs(getAppliedJobs());
        setCongrats({ title: job.title, company: job.company });
    };

    const handleSaveToggle = (job) => {
        toggleSaveJob({ jobId: job.id, title: job.title, company: job.company });
        setSavedJobs(getSavedJobs());
    };

    const handleRemoveApplied = (jobId) => {
        removeAppliedJob(jobId);
        setAppliedJobs(getAppliedJobs());
    };

    const handleClearApplied = () => {
        clearAppliedJobs();
        setAppliedJobs([]);
    };

    const handleRemoveSaved = (jobId) => {
        removeSavedJob(jobId);
        setSavedJobs(getSavedJobs());
    };

    const handleClearSaved = () => {
        clearSavedJobs();
        setSavedJobs([]);
    };

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

                    <div className="jobs-status-row">
                        <span className="jobs-status-pill">
                            <Heart size={14} /> Saved Jobs: {savedJobs.length}
                        </span>

                        {isAuthenticated && (
                            <span className="jobs-status-pill">
                                <CheckCircle2 size={14} /> Applied Jobs: {appliedJobs.length}
                            </span>
                        )}
                    </div>

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

                {isAuthenticated ? (
                    appliedJobs.length > 0 && (
                        <div className="applied-jobs-panel">
                            <div className="applied-jobs-head">
                                <History size={18} />
                                <h3>Your Applied Jobs</h3>
                                <button
                                    type="button"
                                    className="history-clear-btn"
                                    onClick={handleClearApplied}
                                >
                                    <Trash2 size={13} /> Clear All
                                </button>
                            </div>

                            <div className="applied-jobs-list">
                                {appliedJobs.map((a) => (
                                    <div className="applied-job-item" key={a.id}>
                                        <span className="applied-job-title">{a.title}</span>
                                        <span className="applied-job-company">{a.company}</span>
                                        <span className="applied-job-date">{formatDateTime(a.appliedAt)}</span>
                                        <button
                                            type="button"
                                            className="history-item-remove"
                                            onClick={() => handleRemoveApplied(a.jobId)}
                                            aria-label="Remove from history"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    <div className="applied-jobs-login-prompt">
                        <LogIn size={16} />
                        <span>Login to apply for jobs and see your application history here.</span>
                    </div>
                )}

                {savedJobs.length > 0 && (
                    <div className="applied-jobs-panel">
                        <div className="applied-jobs-head">
                            <Heart size={18} />
                            <h3>Your Saved Jobs</h3>
                            <button
                                type="button"
                                className="history-clear-btn"
                                onClick={handleClearSaved}
                            >
                                <Trash2 size={13} /> Clear All
                            </button>
                        </div>

                        <div className="applied-jobs-list">
                            {savedJobs.map((s) => (
                                <div className="applied-job-item" key={s.jobId}>
                                    <span className="applied-job-title">{s.title}</span>
                                    <span className="applied-job-company">{s.company}</span>
                                    <span className="applied-job-date">{formatDateTime(s.savedAt)}</span>
                                    <button
                                        type="button"
                                        className="history-item-remove"
                                        onClick={() => handleRemoveSaved(s.jobId)}
                                        aria-label="Remove from saved"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="jobs-container">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => {
                            const applied = appliedJobIds.has(job.id);
                            const saved = savedJobIds.has(job.id);

                            return (
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
                                        <button
                                            className={`apply-btn${applied ? " applied" : ""}`}
                                            type="button"
                                            disabled={applied}
                                            onClick={() => handleApply(job)}
                                        >
                                            {applied ? (<><CheckCircle2 size={16} /> Applied</>) : "Apply Now"}
                                        </button>
                                        <button
                                            className={`save-btn${saved ? " saved" : ""}`}
                                            type="button"
                                            onClick={() => handleSaveToggle(job)}
                                        >
                                            <Heart size={15} fill={saved ? "currentColor" : "none"} />
                                            {saved ? " Saved" : " Save Job"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
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

            {showLoginModal && (
                <LoginRequiredModal
                    message="You are not logged in. Please login to apply for this job."
                    onCancel={() => setShowLoginModal(false)}
                />
            )}

            {congrats && (
                <div className="congrats-overlay" onClick={() => setCongrats(null)}>
                    <div className="congrats-card" onClick={(e) => e.stopPropagation()}>
                        <div className="congrats-icon">
                            <CheckCircle2 size={34} />
                        </div>
                        <h3>Congratulations!</h3>
                        <p>
                            You've successfully applied for <strong>{congrats.title}</strong> at{" "}
                            <strong>{congrats.company}</strong>.
                        </p>
                    </div>
                </div>
            )}

            <Footer />
        </>

    );
};

export default ApplyJobs;

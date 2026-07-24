import { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Filter,
} from "lucide-react";
import internship from "../../../API/internshipHome";
import "./Internship.css";
import Footer from "../../Footer/Footer";

const Internship = () => {
    const [internships, setInternships] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [internType, setInternType] = useState("All");

    useEffect(() => {
        setInternships(internship);
    }, []);

    const filterIntern = internships.filter((job) => {
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

        switch (internType) {
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

        return matchesSearch && matchesLocation && matchesType;
    });

    return (
        <>
            <section className="internship">
                <div className="internship-hero">
                    <h1>Find Your Dream Internship</h1>

                    <p>
                        Discover the best internships from top companies,
                        gain real-world experience, and kickstart your career.
                    </p>

                    <div className="search-box">
                        <div className="input-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search Internship..."
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

                        <button className="search-btn">
                            Search Internship
                        </button>
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={internType === "All" ? "active-filter" : ""}
                            onClick={() => setInternType("All")}
                        >
                            <Filter size={16} />
                            All
                        </button>

                        <button
                            className={internType === "Remote" ? "active-filter" : ""}
                            onClick={() => setInternType("Remote")}
                        >
                            Remote
                        </button>

                        <button
                            className={internType === "Full Time" ? "active-filter" : ""}
                            onClick={() => setInternType("Full Time")}
                        >
                            Full Time
                        </button>

                        <button
                            className={internType === "Part Time" ? "active-filter" : ""}
                            onClick={() => setInternType("Part Time")}
                        >
                            Part Time
                        </button>

                        <button
                            className={internType === "Internship" ? "active-filter" : ""}
                            onClick={() => setInternType("Internship")}
                        >
                            Internship
                        </button>

                        <button
                            className={internType === "Hybrid" ? "active-filter" : ""}
                            onClick={() => setInternType("Hybrid")}
                        >
                            Hybrid
                        </button>

                        <button
                            className={internType === "Fresher" ? "active-filter" : ""}
                            onClick={() => setInternType("Fresher")}
                        >
                            Fresher
                        </button>
                    </div>
                </div>

                <div className="internship-container">
                    {filterIntern.length > 0 ? (
                        filterIntern.map((internship) => (
                            <div
                                className="internship-card"
                                key={internship.id}
                            >
                                <div className="internship-header">
                                    <div className="company-logo">
                                        <BriefcaseBusiness size={32} />
                                    </div>

                                    <div className="company-info">
                                        <h2>{internship.title}</h2>
                                        <h4>{internship.company}</h4>
                                    </div>
                                </div>

                                <div className="internship-details">
                                    <div className="detail-item">
                                        <MapPin size={18} />
                                        <span>{internship.location}</span>
                                    </div>

                                    <div className="detail-item">
                                        <BriefcaseBusiness size={18} />
                                        <span>{internship.type}</span>
                                    </div>
                                </div>

                                <div className="internship-extra">
                                    <div>
                                        <h5>Stipend</h5>
                                        <p>{internship.stipend}</p>
                                    </div>

                                    <div>
                                        <h5>Duration</h5>
                                        <p>{internship.duration}</p>
                                    </div>
                                </div>

                                <div className="skills">
                                    {internship.skills.map((skill, index) => (
                                        <span key={index}>{skill}</span>
                                    ))}
                                </div>

                                <div className="internship-actions">
                                    <button className="apply-btn">
                                        Apply Now
                                    </button>

                                    <button className="save-btn">
                                        Save Internship
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-job-found">
                            <h2>No Internship Found</h2>
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

export default Internship;
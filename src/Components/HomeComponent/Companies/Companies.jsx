import { useEffect, useState } from "react";
import "./Companies.css";
import companiesHome from "../../../API/companiesHome"

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        setCompanies(companiesHome);
    }, []);

    return (
        <section className="companies">

            <div className="companies-heading">
                <span>TOP COMPANIES</span>

                <h2>Top Companies Hiring</h2>

                <p>
                    Explore opportunities from leading companies and kickstart your
                    dream career with trusted employers.
                </p>
            </div>

            <div className="companies-grid">
                {companies.map((company) => (
                    <div className="company-card" key={company.id}>
                        <img src={company.logo} alt={company.name} />

                        <h3>{company.name}</h3>

                        <p>{company.jobs}</p>

                        <button>View Jobs</button>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Companies;
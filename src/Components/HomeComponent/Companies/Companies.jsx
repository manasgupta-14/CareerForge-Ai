import "./Companies.css";

const companies = [
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        name: "Google",
        jobs: "120+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        name: "Microsoft",
        jobs: "95+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        name: "Amazon",
        jobs: "150+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        name: "Netflix",
        jobs: "40+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Adobe_Corporate_logo.svg",
        name: "Adobe",
        jobs: "55+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Infosys_logo.svg",
        name: "Infosys",
        jobs: "220+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        name: "TCS",
        jobs: "310+ Jobs",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Wipro_Primary_Logo_Color_RGB.svg",
        name: "Wipro",
        jobs: "170+ Jobs",
    },
];

const Companies = () => {
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

                {companies.map((company, index) => (

                    <div className="company-card" key={index}>

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
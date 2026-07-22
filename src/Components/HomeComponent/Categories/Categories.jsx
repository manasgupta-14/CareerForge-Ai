import "./Categories.css";

const categories = [
    {
        icon: "💻",
        title: "Frontend",
        jobs: "245 Jobs",
    },
    {
        icon: "🖥️",
        title: "Backend",
        jobs: "198 Jobs",
    },
    {
        icon: "🚀",
        title: "Full Stack",
        jobs: "320 Jobs",
    },
    {
        icon: "🎨",
        title: "UI / UX",
        jobs: "112 Jobs",
    },
    {
        icon: "🤖",
        title: "AI / ML",
        jobs: "158 Jobs",
    },
    {
        icon: "☁️",
        title: "Cloud",
        jobs: "135 Jobs",
    },
    {
        icon: "📊",
        title: "Data Analyst",
        jobs: "174 Jobs",
    },
    {
        icon: "🔐",
        title: "Cyber Security",
        jobs: "98 Jobs",
    },
];

const Categories = () => {
    return (
        <section className="categories">

            <div className="categories-heading">

                <span>JOB CATEGORIES</span>

                <h2>Browse Jobs by Category</h2>

                <p>
                    Discover thousands of opportunities across the most popular
                    technology domains and start your career journey today.
                </p>

            </div>

            <div className="categories-grid">

                {categories.map((category, index) => (

                    <div className="category-card" key={index}>

                        <div className="category-icon">
                            {category.icon}
                        </div>

                        <h3>{category.title}</h3>

                        <p>{category.jobs}</p>

                        <button>Explore Jobs →</button>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Categories;
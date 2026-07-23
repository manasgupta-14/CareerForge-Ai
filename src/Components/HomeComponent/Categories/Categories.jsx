import React, { useEffect, useState } from 'react'
import categoriesHome from "../../../API/categoriesHome"
import "./Categories.css"

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(categoriesHome)
    }, []);

    return (
        <>
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
                    {categories.map((category) => (
                        <div className="category-card" key={category.id}>
                            <div className="category-icon">
                                {category.icon}
                            </div>

                            <h3>{category.title}</h3>
                            <p>{category.jobs}</p>
                            <button>Explore Jobs</button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Categories
import React, { useState } from "react";
import "./Contact.css";

import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    Sparkles,
} from "lucide-react";
import Footer from "../../Components/Footer/Footer";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Message Sent Successfully!");

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="contact-page">

            {/* Hero */}

            <section className="contact-hero">

                <div className="contact-hero-content">

                    <span className="contact-tag">
                        <Sparkles size={16} />
                        CONTACT US
                    </span>

                    <h1>
                        We'd Love To
                        <span> Hear From You</span>
                    </h1>

                    <p>
                        Have questions about CareerForge AI?
                        Our team is always ready to help you.
                    </p>

                </div>

            </section>

            {/* Contact Cards */}

            <section className="contact-info">

                <div className="contact-card">
                    <div className="icon-box">
                        <Phone size={28} />
                    </div>

                    <h3>Call Us</h3>
                    <p>+91 98765 43210</p>
                </div>

                <div className="contact-card">
                    <div className="icon-box">
                        <Mail size={28} />
                    </div>

                    <h3>Email</h3>
                    <p>support@careerforgeai.com</p>
                </div>

                <div className="contact-card">
                    <div className="icon-box">
                        <MapPin size={28} />
                    </div>

                    <h3>Location</h3>
                    <p>Noida, Uttar Pradesh, India</p>
                </div>

                <div className="contact-card">
                    <div className="icon-box">
                        <Clock size={28} />
                    </div>

                    <h3>Working Hours</h3>
                    <p>Mon - Sat | 9:00 AM - 6:00 PM</p>
                </div>

            </section>

            {/* Contact Form */}

            <section className="contact-section">

                <div className="contact-left">

                    <span className="small-title">
                        GET IN TOUCH
                    </span>

                    <h2>Send Us A Message</h2>

                    <p>
                        Fill out the form and our support team
                        will contact you shortly.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-row">

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-row">

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <textarea
                            rows="7"
                            name="message"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="send-btn"
                        >
                            <Send size={18} />
                            Send Message
                        </button>

                    </form>

                </div>
                {/* ================= RIGHT SIDE ================= */}

                <div className="contact-right">

                    <div className="office-card">

                        <h3>Office Information</h3>

                        <div className="office-item">
                            <Phone size={20} />
                            <div>
                                <h4>Phone</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="office-item">
                            <Mail size={20} />
                            <div>
                                <h4>Email</h4>
                                <p>support@careerforgeai.com</p>
                            </div>
                        </div>

                        <div className="office-item">
                            <MapPin size={20} />
                            <div>
                                <h4>Address</h4>
                                <p>
                                    CareerForge AI<br />
                                    Noida, Uttar Pradesh<br />
                                    India
                                </p>
                            </div>
                        </div>

                        <div className="office-item">
                            <Clock size={20} />
                            <div>
                                <h4>Office Hours</h4>
                                <p>
                                    Monday - Saturday
                                    <br />
                                    9:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* ================= SOCIAL ================= */}

                    <div className="social-card">

                        <h3>Follow Us</h3>

                        <p>
                            Follow CareerForge AI on social media for
                            the latest jobs, internships, career tips
                            and announcements.
                        </p>

                        <div className="social-icons">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedinIn size={20} />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaXTwitter size={20} />
                            </a>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= MAP ================= */}

            <section className="map-section">

                <div className="section-title">

                    <span>OUR LOCATION</span>

                    <h2>Visit Our Office</h2>

                    <p>
                        We are always happy to meet students,
                        recruiters and job seekers.
                    </p>

                </div>

                <div className="map-box">

                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=Noida,+Uttar+Pradesh&output=embed"
                        width="100%"
                        height="450"
                        style={{
                            border: 0,
                            borderRadius: "20px",
                        }}
                        loading="lazy"
                        allowFullScreen
                    />

                </div>

            </section>

            <Footer/>
        </div>
    );
};

export default Contact;
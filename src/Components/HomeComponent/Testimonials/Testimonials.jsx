import "./Testimonials.css";
import testimonials_home from "../../../API/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
    return (
        <section className="testimonials">

            <div className="testimonial-heading">
                <span>SUCCESS STORIES</span>

                <h2>What Our Users Say</h2>

                <p>
                    Thousands of job seekers trust CareerForge AI to build
                    their careers.
                </p>
            </div>

            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                speed={800}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                className="testimonial-slider"
            >
                {testimonials_home.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="testimonial-card">

                            <div className="testimonial-rating">
                                {item.rating}
                            </div>

                            <p className="testimonial-review">
                                "{item.review}"
                            </p>

                            <div className="testimonial-user">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div>
                                    <h3>{item.name}</h3>

                                    <span>
                                        {item.role} • {item.company}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default Testimonials;
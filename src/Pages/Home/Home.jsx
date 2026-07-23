import CareerTips from "../../Components/HomeComponent/CarrerTips/CareerTips";
import Categories from "../../Components/HomeComponent/Categories/Categories";
import Companies from "../../Components/HomeComponent/Companies/Companies";
import FeaturedJobs from "../../Components/HomeComponent/FeaturedJobs/FeaturedJobs";
import Hero from "../../Components/HomeComponent/Hero/Hero";
import LatestJobs from "../../Components/HomeComponent/LatestJobs/LatestJobs";
import Testimonials from "../../Components/HomeComponent/Testimonials/Testimonials";
import WhyChoose from "../../Components/HomeComponent/WhyChooseUs/WhyChooseUs";
import NewsLetter from "../../Components/HomeComponent/NewsLetter/NewsLetter";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
    return (
        <>
            <Hero />
            <Companies />
            <Categories />
            {/* <FeaturedJobs />
            <LatestJobs />
            <WhyChoose />
            <CareerTips />
            <Testimonials />
            <NewsLetter />
            <Footer /> */}
        </>
    )
};

export default Home;
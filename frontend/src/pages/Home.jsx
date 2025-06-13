import DualCTASection from "../components/DualCTASection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <DualCTASection />
      <Footer />
    </div>
  );
};

export default Home;

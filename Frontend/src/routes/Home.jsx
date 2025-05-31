import React from "react";
import Hero from "../components/Hero";
import FeaturedMovies from "../components/FeaturedMovies";
import LatestReviews from "../components/LatestReviews";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedMovies />
      <LatestReviews />
      <Footer />
    </>
  );
};

export default Home;

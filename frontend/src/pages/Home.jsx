import React from "react";
import Navigation from "../components/Navigations";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";




const Home = () => {
    return (
        <div>
            <Navigation />
        <main>
            <Hero/>  
            <Features/>  
        </main>
            <Footer/>
        </div>
    );
};

export default Home;
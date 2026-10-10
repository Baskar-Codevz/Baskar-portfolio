
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AdminTestimonials from "./components/AdminTestimonials";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/admin/testimonials"
          element={<AdminTestimonials />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

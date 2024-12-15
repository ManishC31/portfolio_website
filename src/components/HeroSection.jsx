"use client";

import React from "react";
import HeroImage from "../assets/img/hero-img.jpg";

const HeroSection = () => {
  return (
    <div>
      {/* <img src={HeroImage} alt="" data-aos="fade-in" /> */}

      <div
        className="container d-flex flex-column align-items-center justify-content-center text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2>Software Developer</h2>
        <p>
          <span
            className="typed"
            data-typed-items="Designer, Developer, Freelancer, Photographer"
          ></span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

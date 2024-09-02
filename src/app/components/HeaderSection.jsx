"use client";
import React from "react";
import Image from "next/image";
import ProgrammerImg from "../../../public/programmer_image.jpg";
import VectorImage from "../../../public/vector_image.svg";

const HeaderSection = () => {
  return (
    <div className="bg-base-300">
      <div className="hero h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            width={550}
            height={550}
            src={ProgrammerImg}
            className="hidden lg:block rounded-2xl shadow-lg"
          />
          <div className="text-center lg:text-start">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 tracking-wider text-accent">
              Software Engineer
            </h1>
            <p className="py-4 text-base-info text-lg tracking-wide text-content">
              Passionate about crafting efficient and scalable web applications,
              with a focus on modern backend technologies. <br />
              Experienced in building seamless user experiences with a strong
              command over Node.js, React, and Tailwind CSS.
            </p>
            <button className="btn btn-accent mt-4">Know More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;

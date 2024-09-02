"use client";

import React from "react";

const allEducation = [
  {
    qualification: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    university: "Mumbai university",
    name: "Padmabhushan Vasantdata Patil Pratishthan's College of Engineering",
    percentage: 7.5,
    extension: "CGPA",
  },
  {
    qualification: "Higher Secondary Education",
    major: "Science",
    university: "Mumbai university",
    percentage: 69.54,
    extension: "%",
  },
  {
    qualification: "Secondary School Education",
    university: "Mumbai University",
    name: "Royal High School",
    percentage: 90.6,
    extension: "%",
  },
];

const Education = () => {
  return (
    <div className="hero bg-base-300 py-24">
      <div className="hero-content text-center flex flex-col items-center">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-accent">Education</h1>
          <p className="py-6 text-xl tracking-wider">
            A journey of knowledge and growth
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEducation.map((data, index) => (
            <div key={index} className="card bg-base-100 shadow-xl p-6">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-success">
                  {data.qualification}
                </h2>
                <p className="text-lg ">{data.major}</p>
                <p className="text-md text-accent">{data.university}</p>
                <p className="text-md text-warning">
                  {data.percentage} {data.extension}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;

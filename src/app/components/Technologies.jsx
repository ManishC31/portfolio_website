"use client";

import React from "react";
import Image from "next/image";
import FastAPI from "../../../public/technologies/fastapi.svg";
import Javascript from "../../../public/technologies/javascript.svg";
import Mongodb from "../../../public/technologies/mongodb_2.svg";
import Nodejs from "../../../public/technologies/nodejs.svg";
import Postgresql from "../../../public/technologies/postgresql.svg";
import Python from "../../../public/technologies/python.svg";
import ReactIcon from "../../../public/technologies/react.svg";
import Typescript from "../../../public/technologies/typescript.svg";

let allTechnologies = [
  {
    title: "Javascript",
    image: Javascript,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "Typescript",
    image: Typescript,
    url: "https://www.typescriptlang.org/",
  },
  {
    title: "Python",
    image: Python,
    url: "https://www.python.org/",
  },
  {
    title: "Nodejs",
    image: Nodejs,
    url: "https://nodejs.org/en",
  },
  {
    title: "React",
    image: ReactIcon,
    url: "https://react.dev/",
  },
  {
    title: "FastAPI",
    image: FastAPI,
    url: "https://fastapi.tiangolo.com/",
  },
  {
    title: "PostgreSQL",
    image: Postgresql,
    url: "https://www.postgresql.org/",
  },
  {
    title: "MongoDB",
    image: Mongodb,
    url: "https://www.mongodb.com/",
  },
];

const technologies = () => {
  return (
    <div>
      <div className="hero bg-base-200 py-24">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-semibold text-accent">
              Known Technologies
            </h1>
            <p className="py-6 text-xl tracking-wider">
              Familiar technologies and languages that I have used.
            </p>
            <div className="flex flex-col">
              {/* show icons of technologies  */}
              <div className="flex flex-wrap justify-center gap-8">
                {allTechnologies.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-base-200 rounded-lg"
                  >
                    <Image
                      src={data.image}
                      alt={data.title}
                      className="mb-2 cursor-pointer"
                      onClick={() => window.open(data.url, "_blank")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default technologies;

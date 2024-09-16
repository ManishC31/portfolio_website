"use client";

import React, { useState } from "react";
import copy from "clipboard-copy";
import CopyIcon from "../../../public/copy_icon.svg";
import Image from "next/image";

const Contact = () => {
  const [isMailCopied, setIsMailCopied] = useState(false);
  const [isContactCopied, setIsContactCopied] = useState(false);

  const mail = "manishchavan80@gmail.com";
  const contact = "+918369730378";

  const handleCopyMail = () => {
    copy(mail);
    setIsMailCopied(true);
    setTimeout(() => setIsMailCopied(false), 2000); // Reset after 2 seconds
  };

  const handleCopyContact = () => {
    copy(contact);
    setIsContactCopied(true);
    setTimeout(() => setIsContactCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="hero bg-base-300 py-24">
      <div className="hero-content text-center">
        <div className="flex flex-col">
          <div>
            <h1 className="text-5xl font-semibold text-accent">Contact</h1>
            <p className="py-6 text-xl tracking-wider">
              Contact me for any queries or opportunities
            </p>
          </div>
          <div className="flex items-center gap-x-4 text-2xl md:text-4xl lg:text-6xl font-bold my-10 mx-auto">
            <p className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              {mail}
            </p>
            <button
              onClick={handleCopyMail}
              className="btn mt-2 btn-outline btn-accent btn-xs"
            >
              {
                isMailCopied ? "Copied !" : "Copy" // Icon if not copied
              }
            </button>
          </div>
          <div className="flex items-center gap-x-4 text-4xl md:text-6xl lg:text-8xl font-bold mx-auto">
            <p className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {contact}
            </p>
            <button
              onClick={handleCopyContact}
              className="btn mt-2 btn-outline btn-accent btn-xs"
            >
              {isContactCopied ? "Copied !" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

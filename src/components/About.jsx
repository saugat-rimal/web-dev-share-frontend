import React from "react";
import logo from "../assets/logo.png";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const About = () => {
  return (
    <div className="h-full mt-10 w-full flex items-center flex-col">
      <div className="max-w-[850px] sm:bg-white p-11 sm:m-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <img src={logo} alt="logo" width={150} />
        </div>

        <p className=" text-gray-600 mt-9 ">
          We provide the opportunity for you to showcase your projects and ideas
          and get them in front of a wider audience. This includes your own
          personal portfolio or perhaps a business opportunity or an idea that
          you are working on.
        </p>

        <div>
          <h2 className="text-3xl font-semibold mt-14 text-start">
            Made By Saugat Rimal
          </h2>
          <div className="flex flex-col gap-5 mt-5">
            <p className=" text-gray-600 ">
              A frontend and design enthusiast who enjoys open source technology
              and builds accessible, human-centered products. I've designed &
              developed number's of websites and web applications including
              chrome extensions.
            </p>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div>
              <a
                href="https://saugatrimal.com.np"
                className=" w-36 text-center flex items-center gap-2  rounded-full px-5 py-2  opacity-75 hover:opacity-100 hover:shadow-md text-dark hover:text-white hover:bg-red-500 focus:outline-none transition-all duration-500 ease-in-out underline underline-offset-4  "
                target="_blank"
              >
                View Portfolio
              </a>
            </div>

            <div className="flex gap-4 items-center ">
              <a
                href="https://github.com/saugat-rimal"
                className="text-white p-3 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-500 ease-in-out"
                target="_blank"
              >
                <FiGithub />
              </a>

              <a
                className="text-white p-3 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-500 ease-in-out"
                target="_blank"
                href="https://www.linkedin.com/in/saugatrimal/"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

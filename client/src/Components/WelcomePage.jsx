import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "animate.css";
import freelanceImageSrc from "../assets/freelancer.png";
import labourImageSrc from "../assets/workers.png";
import aboutImageSrc from "../assets/workers.png";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center text-center">
      <div className="text-5xl md:text-6xl font-bold mt-10 mb-8 animate__animated animate__bounceInDown text-blue-900">
        Welcome to WorkWagon
      </div>
      <div className="lg:flex flex-col lg:flex-row gap-8 lg:mb-12">
        <Link
          to="/freelancehome"
          className="w-full lg:w-1/2 p-4 transform hover:scale-105"
        >
          <div className="border border-blue-900 hover:bg-blue-300 bg-opacity-70 bg-cover h-96 w-4/5 md:w-96 lg:w-full rounded-lg p-6 m-auto lg:m-0 flex flex-col items-center justify-center">
            <img
              src={freelanceImageSrc}
              alt="Freelance Icon"
              className="w-40 h-40 mb-12"
            />
            <h2 className="text-3xl font-bold text-blue-900 text-center">
              Browse Freelance Jobs
            </h2>
          </div>
        </Link>
        <Link
          to="/labourhomepage"
          className="w-full lg:w-1/2 p-4 transform hover:scale-105"
        >
          <div className="border border-blue-900 hover:bg-blue-300 bg-opacity-70 bg-cover h-96 w-4/5 md:w-96 lg:w-full rounded-lg p-6 m-auto lg:m-0 flex flex-col items-center justify-center">
            <img
              src={labourImageSrc}
              alt="Labour Icon"
              className="w-40 h-40 mb-12"
            />
            <h2 className="text-3xl font-bold text-blue-900 text-center">
              Browse Labour Jobs
            </h2>
          </div>
        </Link>
      </div>

      <div className="lg:flex items-center justify-center mt-12 mx-8 lg:mx-12 lg:w-5/6">
        <div className="w-full lg:w-5/6 p-2 lg:pt-10">
          <h2 className="text-3xl font-bold text-blue-900 text-left mb-4">
            About Us
          </h2>
          <p className="text-xl text-blue-900 text-left ">
            At WorkWagon, we believe in the power of connecting talent with
            transcending boundaries and redefining the landscape of freelancing.
            Our platform is not just a marketplace for digital services; it's a
            dynamic ecosystem that extends its reach to the tangible world of
            labor and services.
          </p>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={aboutImageSrc}
            alt="About Us"
            className="w-4/5 md:w-60 md:h-60 lg:w-72 lg:h-72 mb-4 m-auto lg:mt-12 lg:pt-7 lg:mb-0 float-none lg:float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

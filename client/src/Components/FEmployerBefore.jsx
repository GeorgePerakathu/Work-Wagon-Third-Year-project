import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar.jsx";
import Footerlabour from "./Footerlabour.jsx";
import image22 from '../assets/13.jpg'
import customFetch from "../utils/customFetch.js";

const FEmployerBefore = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await customFetch.get("/viewjobs");
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (jobId) => {
    // Navigate to the /allbids page with the job ID
    // Use the appropriate path based on your route configuration
    window.location.href = `/allbids`;
  };

  return (
    <>
      <Navbar />
      <div>
        <h1 className="p-6"> All Available Bids</h1>
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap -mx-4">
            {jobs &&
              jobs.map((job, index) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  {job.url && (
          <img src={job.url} alt={job.Freelancer_Name} className="w-full h-48 object-cover" />
        )}
                    <Link to={`/allbids/${job.bidId}`}>
                      <p className="text-gray-700 text-base mb-2">{job.bidId}</p>
                        <div className="text-xl font-semibold mb-2">{job.companyName}</div>
                        <p className="text-gray-700 text-base mb-2">{job.requirement}</p>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500 mr-1" />
                          {job.amount}
                        </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footerlabour />
    </>
  );
};

export default FEmployerBefore;

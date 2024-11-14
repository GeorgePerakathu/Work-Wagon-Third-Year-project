// Employerjobs.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import customFetch from "../utils/customFetch.js";

const Employerjobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await customFetch.get("/jobsearch");
        console.log(response);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Fetch jobs when the component mounts
    fetchJobs();
  }, []);

  const handleJobClick = (jobId) => {
    // Navigate to the /approval page with the job ID
    // Use the appropriate path based on your route configuration
    window.location.href = `/approval?jobId=${jobId}`;
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-4">
          {jobs &&
            jobs.map((job, index) => (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Carousel showThumbs={false}>
                    {job.images &&
                      job.images.map((image, imageIndex) => (
                        <div key={imageIndex}>
                          <img src={image} alt={job.name} className="w-full h-48 object-cover" />
                        </div>
                      ))}
                  </Carousel>
                  <Link to="/approval">
                    <div className="px-6 py-4" onClick={() => handleJobClick(job.jobId)}>
                      <div className="text-xl font-semibold mb-2">{job.sitename}</div>
                      <p className="text-gray-700 text-base mb-2">{job.description}</p>
                      <p className="text-gray-700 text-base mb-2">{job.jobrole}</p>
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-1" />
                        {job.jobLocation},{job.jobPincode}
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500 mr-1" />
                        {job.price}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Employerjobs;

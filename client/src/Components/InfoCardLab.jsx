import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import customFetch from "../utils/customFetch.js";

const InfoCardLab = ({ searchParams }) => {
  const [jobs, setJobs] = useState([]);
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);


     useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await customFetch.get("/jobs", {
          params: searchParams,
        });
        console.log(response);

        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (Object.keys(searchParams).length !== 0) {

      fetchJobs();
    } else {

      setJobs([]);
    }
  }, [searchParams]);

  const handleApplyClick = (job) => {
    if (job && job.jobId) {
      console.log('Clicked on job with ID:', job.jobId);
      setSelectedJob(job.jobId);
      setSelectedName(job.sitename);
      setSelectedRole(job.jobrole);
      setShowApplyConfirm(true);
    } else {
      console.error('Invalid job data. Job or Job ID is undefined:', job);
    }
  };

  const handleConfirmApply = async () => {
    setShowApplyConfirm(false);

    try {
      // Fetch user data after successful application
      const userResponse = await customFetch.get("/users/current-user");
      console.log("User Response:", userResponse);

      const user = userResponse.data.user;
      if (user && user.name) {
        console.log("User Data:", {
          name: user.name,
          uin: user.uin,
        });

        await customFetch.post("/JobApplicants", {
          name: user.name,
          uin: user.uin,
          jobId: selectedJob,
          jobName: selectedName,
          jobRole: selectedRole,
        });
      } else {
        console.error("Invalid user data structure:", user);
      }

      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-4">
          {jobs.map((job, index) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Carousel showThumbs={false}>
                  {job.images.map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img
                        src={image}
                        alt={job.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <Link to="">
                  <div className="px-6 py-4">
                    <div className="text-xl font-semibold mb-2">
                      {job.sitename}
                    </div>
                    <p className="text-gray-700 text-base mb-2">
                      {job.description}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                      {job.jobrole}
                    </p>
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-red-500 mr-1"
                      />
                      {job.jobLocation},{job.jobPincode}
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="text-green-500 mr-1"
                      />
                      {job.price}
                    </div>
                  </div>
                </Link>
                <div className="px-6 py-4 bg-blue-600 transition-all duration-300 hover:bg-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <button
                    className="w-full text-white font-semibold"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showApplyConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to apply?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowApplyConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmApply}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessAlert && (
        <div className="fixed top-0 right-0 m-4 bg-green-400 text-black px-4 py-2 rounded z-50">
          Successfully applied
        </div>
      )}
    </div>
  );
};

export default InfoCardLab;

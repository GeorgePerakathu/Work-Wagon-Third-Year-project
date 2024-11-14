// ApprovalLabour.jsx

import React, { useState, useEffect } from 'react';
import Navlabour from './Navlabour';
import Footerlabour from './Footerlabour';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import customFetch from '../utils/customFetch';
import { useLocation } from 'react-router-dom';
function ApprovalLabour() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const location = useLocation();
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Fetch job applicants based on the jobDetails.jobId
        const response = await customFetch.get(`/JobApplicants?jobId=${jobDetails.jobId}`);
        console.log("Applicants Response:", response);
  
        // Assuming response.data is an array of applicants
        setApplicants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setLoading(false);
      }
    };
  
    // Fetch applicants only when jobDetails.jobId is available
    if (jobDetails.jobId) {
      fetchApplicants();
    }
  }, [jobDetails.jobId]);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jobId = queryParams.get('jobId');

    const fetchJobDetails = async () => {
      try {
        console.log("Fetching jobId:", jobId);
        const response = await customFetch.get(`/empjob/${jobId}`);
        console.log("Job Details Response:", response);

        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    // Fetch job details when the jobId changes
    if (jobId) {
      fetchJobDetails();
    }
  }, [location.search]);


  
  const handleAction = async (action, id) => {
    try {
      if (action === "accepted") {
        console.log("Accept action clicked");

        await customFetch.post("/finalApplicants", {
          jobId: jobDetails.jobId,
          jobName: jobDetails.sitename,
          jobRole: jobDetails.jobrole,
          price: jobDetails.price,
          name: applicants[0].name,
          uin: applicants[0].uin,
        });

      }
    } catch (error) {
      console.error("Error handling action:", error);
    }
    try {
      if (action === "accepted") {
        console.log("Accept action clicked");

        await customFetch.post("/JobApplicants/update", {
          id: id, // Use the passed ID here
          status: "Accepted",
        });
      }
    } catch (error) {
      console.error("Error handling action:", error);
    }
    if (action === "rejected") {
      console.log("Reject action clicked");
      console.log("TP", id), // And here
        await customFetch.post("/JobApplicants/update", {
          id: id, // And here
          status: "Rejected",
        });
    }
  };
  
  

  return (
    <>
      <Navlabour />
      <div className="p-5" id="overall">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:ml-4">
            {/* Displaying additional job details */}
            <h1 className="text-3xl font-bold m-5 mb-4">
              Job-ID: {jobDetails.jobId}
            </h1>
            <h1 className="text-2xl font-bold m-5 mb-4">
              Job-Name: {jobDetails.sitename}
            </h1>
            <h1 className="text-2xl font-bold m-5 mb-4">
              Job-Role: {jobDetails.jobrole}
            </h1>
            <p className="text-gray-700 text-xl m-5 mb-8">
              <strong>Number Of Applications :- </strong> {applicants.length}
            </p>
            <div className="flex text-xl items-center m-5">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-500 mr-1"
              />
              <strong className="ml-3">
                Location: {jobDetails.jobLocation}
              </strong>
            </div>
            <div className="flex text-xl items-center m-5">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-green-500 mr-1"
              />
              <strong className="ml-3">Price: {jobDetails.price}</strong>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto m-5">
          <h1>Job Applicants</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="px-auto w-[97%] bg-transparent" id="table">
            <table className="w-full min-w-max table-auto text-center text-white bg-blue-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">UID (Mobile No.)</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{applicant.name}</td>
                      <td className="py-2 px-4 border-b">{applicant.uin}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded-lg"
                          id="accept"
                          onClick={() =>
                            handleAction("accepted", applicant._id)
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-lg"
                          id="decline"
                          onClick={() =>
                            handleAction("rejected", applicant._id)
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footerlabour />
    </>
  );
}

export default ApprovalLabour;

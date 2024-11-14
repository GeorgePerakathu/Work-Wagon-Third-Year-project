import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navlabour from '../Components/Navlabour';
import Footerlabour from '../Components/Footerlabour';

// Simulated data (replace with your actual data)
const simulatedData = [
  { name: 'Job 1', type: 'Painting', uin: '123456789' },
  { name: 'Job 2', type: 'Painting', uin: '987654321' },
  // Add more data as needed
];

function JobList() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading delay
    const timeout = setTimeout(() => {
      setApplicants(simulatedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []); // Empty dependency array to mimic componentDidMount

  const handleDelete = (uin) => {
    // Filter out the job with the specified uin
    const updatedApplicants = applicants.filter((applicant) => applicant.uin !== uin);
    setApplicants(updatedApplicants);
  };

  const handleEdit = (applicant) => {
    // Handle the "Edit" action here
    // Navigate to the edit page and pass the necessary data
    navigate(`/modify`);
  };

  return (
    <>
      <Navlabour />
      <div className="p-5" id="overall">
        <div className="w-full overflow-x-auto m-5">
          <h1>All Jobs Posted :-</h1>
          <p className="text-gray-700 text-xl m-5 mb-8">
            <strong>Nos. Jobs Posted :- </strong> {applicants.length}
          </p>

          <div className="px-auto w-[97%] bg-transparent" id="table">
          <table className="w-full min-w-max table-auto text-center text-white bg-blue-800 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Job ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{applicant.uin}</td>
                    <td className="py-2 px-4 border-b">{applicant.name}</td>
                    <td className="py-2 px-4 border-b">{applicant.type}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded-lg"
                        onClick={() => handleEdit(applicant)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 mr-2 rounded-lg"
                        onClick={() => handleDelete(applicant.uin)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footerlabour />
    </>
  );
}

export default JobList;

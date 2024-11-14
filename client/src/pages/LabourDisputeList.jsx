import React, { useState, useEffect } from 'react';
import Navlabour from "../Components/Navlabour";
import Footerlabour from '../Components/Footerlabour';
import { useNavigate } from 'react-router-dom';

const simulatedData = [
  { name: 'Job 1', type: 'Painting', uin: '123456789' },
  { name: 'Job 2', type: 'Painting', uin: '987654321' },
  // Add more data as needed
];

function LabourDisputeList() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading delay
    const timeout = setTimeout(() => {
      setDisputes(simulatedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []); // Empty dependency array to mimic componentDidMount

  const handleDelete = (uin) => {
    // Filter out the dispute with the specified uin
    const updatedDisputes = disputes.filter((dispute) => dispute.uin !== uin);
    setDisputes(updatedDisputes);
  };

  const handleEdit = (dispute) => {
    // Handle the "Edit" action here
    // Navigate to the edit page and pass the necessary data
    navigate(`/labour/dispute/edit`);
  };

  const handleAdd = () => {
    // Handle the "Add" action here
    // Navigate to the add page
    navigate(`/labour/dispute`);
  };

  return (
    <>
      <Navlabour />
      <div className='p-5' id='overall'>
        <div className='w-full overflow-x-auto m-5'>
          <h1>All Disputes Listed:</h1>
          <p className="text-gray-700 text-xl m-5 mb-8">
            <strong>Number of Disputes:</strong> {disputes.length}
          </p>

          <div className="px-auto w-[97%] " id='table'>
            <table className="w-full min-w-max table-auto text-center text-white bg-blue-800 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Dispute ID</th>
                  <th className="py-2 px-4 border-b">Job ID</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{dispute.uin}</td>
                    <td className="py-2 px-4 border-b">{dispute.name}</td>
                    <td className="py-2 px-4 border-b">{dispute.type}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded-lg"
                        onClick={() => handleEdit(dispute)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 mr-2 rounded-lg"
                        onClick={() => handleDelete(dispute.uin)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className='mt-4'>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleAdd}
            >
              Add Dispute
            </button>
          </div>
        </div>
      </div>
      <Footerlabour />
    </>
  );
}

export default LabourDisputeList;

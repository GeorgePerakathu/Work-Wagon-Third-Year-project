import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';

const TABLE_HEAD = ["Freelancer Name", "Tracking Id", "Project status", "Payment Status", "Action"];

// Sample static data for demonstration
const sampleData = [
  {
    Freelancer_Name: "John Doe",
    Tracking_Id: "ABC123",
    Project_status: "accepted",
    Payment_Status: "success",
    Action: "Chat"
  },
  {
    Freelancer_Name: "Jane Smith",
    Tracking_Id: "DEF456",
    Project_status: "rejected",
    Payment_Status: "in_escrow",
    Action: "Chat"
  },
  // Add more sample data as needed
];

function TableWithStripedColumnsw({ addData }) {
  return (
    <div className="text-white p-2 pb-4">
      <Card className="sm:w-full md:w-4/5 overflow-scroll md:overflow-hidden mx-auto">
        <table className="w-full min-w-max table-auto text-left bg-blue-800">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(addData || sampleData).map(
              (
                { Freelancer_Name, Tracking_Id, Project_status, Payment_Status, Action },
                index
              ) => (
                <tr key={index}>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {Freelancer_Name}
                    </Typography>
                  </td>
                  <td className="p-4 bg-blue-gray-50/50">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {Tracking_Id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {Project_status === "accepted" ? "Accepted" : "Rejected"}
                    </Typography>
                  </td>
               
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {Payment_Status === "success" ? "Success" : Payment_Status === "in_escrow" ? "In Escrow" : "Failed"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Button color="white" buttonType="filled" size="sm">
                      {Action}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

const FEmployerStatus = () => {
  const [addData, setAddData] = useState([]);

  useEffect(() => {
    fetchAddData();
  }, []);

  async function fetchAddData() {
    try {
      // Simulate fetching data from an API
      //const response = await fetch('/AddData');
      //if (response.ok) {
      //  const data = await response.json();
      //  setAddData(data);
      //} else {
      //  console.error('Error fetching AddData:', response.statusText);
      //}
      
      // For demonstration purposes, using sampleData directly
      setAddData(sampleData);
    } catch (error) {
      console.error('Error fetching AddData:', error.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-blue-100 p-4 sm:p-6 lg:p-8">
        <TableWithStripedColumnsw addData={addData} />
      </div>
      <Footerlabour />
    </>
  );
};

export default FEmployerStatus;

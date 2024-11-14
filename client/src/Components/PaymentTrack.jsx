// Profile.js
import React, { useState, useEffect } from 'react';
import Footerlabour from './Footerlabour';
import { Card, Typography } from '@material-tailwind/react';
import Navlabour from './Navlabour';
//import img1 from '../assets/profile-pic-2.png';
import customFetch from '../utils/customFetch';

const TABLE_HEAD = ["Name", "UIN", "Job_Id", "Job_Name", "Job_Role", "Payment","Action"];

function TableWithStripedColumns({ addData }) {
  return (
    <div className="text-white  p-2 pb-4">
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
            {Array.isArray(addData) &&
              addData.map(
                (
                  { Name, UIN, Job_Id, Job_Name, Job_Role, Payment },
                  index
                ) => (
                  <tr key={index}>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {Name}
                      </Typography>
                    </td>
                    <td className="p-4 bg-blue-gray-50/50">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {UIN}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {Job_Id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {Job_Name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {Job_Role}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {Payment}
                      </Typography>
                    </td>
                    <td className="p-4">
                    <Typography
                    variant="small"
                   color="white"
                   className="font-bold"  // Add the font-bold class here
                    >
                    Payment Successful
                   </Typography>
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

const PaymentTrack = () => {
  const [addData, setAddData] = useState([]);

  useEffect(() => {
    fetchAddData();
  }, []);

  async function fetchAddData() {
    try {
      const response = await customFetch.get(`/AddData`);

      if (response.statusText === "OK") {
        const add = response.data;
        console.log("AddData:", add);
        setAddData(add);
      } else {
        console.error("Error fetching AddData:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching AddData:", error.message);
    }
  }

  return (
    <>
      <Navlabour />
      <div className="bg-blue-100 p-4 sm:p-6 lg:p-8">
        <TableWithStripedColumns addData={addData} />
      </div>
      <Footerlabour />
    </>
  );
};

export default PaymentTrack;

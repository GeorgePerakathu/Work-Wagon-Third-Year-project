import React, { useState, useEffect } from 'react';
import Footerlabour from '../Components/Footerlabour';
import { Card, Typography } from '@material-tailwind/react';
import Navlabour from '../Components/Navlabour';
import img1 from '../assets/propic.svg';
import customFetch from '../utils/customFetch';

const TABLE_HEAD = ["Name", "UIN", "Job_Id", "Job_Name", "Job_Role","Status"];

function TableWithStripedColumns({ data }) {
  return (
    <div className="bg-blue-100 p-2 pb-4">
      <Card className="h-full  sm:w-full md:w-4/5 overflow-scroll md:overflow-hidden mx-auto">
      <table className="w-full min-w-max table-auto text-center text-white bg-blue-800 rounded-lg">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-white-100 p-4">
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
            {data.map(({ jobId, name, uin, jobName, jobRole,status}, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-white-50";

              return (
                <tr key={uin}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {uin}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {jobId}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {jobName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {jobRole}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState([]);
  const [uin, setUIN] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let uin;  // Define uin here

    try {
      const userResponse = await customFetch.get('/users/current-user');
      const user = userResponse.data.user;

      if (user && user.name) {
        setUserProfile({ name: user.name, UIN: user.uin, location: user.location });
        

        try {
          const response = await customFetch.get(`/JobApplicants/profile`);

          if (response.status === 200) {
            setData(response.data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }

  return (
    <>
      <Navlabour />
      <div className="bg-blue-100 p-4 sm:p-6 lg:p-8">
        {userProfile && (
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 mx-auto max-w-3xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                href={img1}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden"
              >
                <img
                  src={img1}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </a>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold">Name: {userProfile.name}</h2>
                <p className="text-gray-700 text-base">
                  Unique Identification No: {userProfile.UIN}
                </p>
                <p className="text-gray-700 text-base">Location: {userProfile.location}</p>
              </div>
            </div>
          </div>
        )}
        {userProfile && (
          <TableWithStripedColumns data={data} />
        )}
      </div>
      <Footerlabour />
    </>
  );
};

export default Profile;

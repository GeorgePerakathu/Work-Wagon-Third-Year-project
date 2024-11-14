import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook to access URL parameters
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';
import customFetch from '../utils/customFetch'; // Import your custom fetch function

const Displayrequirements = () => {
  const [projects, setProjects] = useState([]);
  const { TrackId } = useParams(); // Extract TrackId from URL parameters

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await customFetch.get(`/requirements/${TrackId}`); // Use TrackId in the URL
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, [TrackId]); // Add TrackId to dependency array so that useEffect runs when TrackId changes

  return (
    <div>
      <Navbar />
      {projects.map((project, index) => (
        <div
          key={index}
          className="containers mx-auto p-4 bg-white rounded-lg shadow-lg w-3/4 my-8"
        >
          <h1 className="text-2xl font-bold mb-4">{project.projectTitle}</h1>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Description:</h2>
            <p>{project.projectDescription}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h2 className="font-semibold mb-2">Deadline:</h2>
              <p>{project.deadline}</p>
            </div>
            <div>
              <h2 className="font-semibold mb-2">Budget:</h2>
              <p>{project.budget}</p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Design Preference:</h2>
            <p>{project.designPreference}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Additional Information:</h2>
            <p>{project.additionalInformation}</p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Job Completed
            </button>
          </div>
        </div>
      ))}
      <Footerlabour />
    </div>
  );
};

export default Displayrequirements;

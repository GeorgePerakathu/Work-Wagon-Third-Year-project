import React from 'react';
import JobForm from './JobForm';


const JobDetailsPage = () => {
  const handleJobSubmit = (jobDetails) => {
    // Handle the submission of job details, e.g., send to server
    console.log('Submitted job details:', jobDetails);
  };

  return (
    <div>
      <h1 >Job Details Page</h1>
      <JobForm onSubmit={handleJobSubmit} />
    </div>
  );
};

export default JobDetailsPage;

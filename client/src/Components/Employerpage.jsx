import React, { useState } from 'react';
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';
import customFetch from '../utils/customFetch';

const Employerpage = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [companySize, setCompanySize] = useState('Small');
  const [phoneNo, setPhoneNo] = useState('');
  const [bio, setBio] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handlePreferencesChange = (e) => {
    setPreferences(e.target.value);
  };

  const handleCompanySizeChange = (e) => {
    setCompanySize(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProceed = async () => {
    try {
      const formData = {
        name,
        companyName,
        preferences,
        companySize,
        phoneNo,
        bio,
      };
      const response = await customFetch.post("/EmpRegisterflps", formData);
      console.log("Server response:", response);
      setName('');
      setCompanyName('');
      setPreferences('');
      setCompanySize('Mid');
      setPhoneNo('');
      setBio('');
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="containers mx-auto p-4 w-2/5">
        <h1 className="text-2xl font-bold mb-4">Employer Page</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">Name:</label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-medium mb-2">Company Name:</label>
          <input
            id="companyName"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preferences" className="block font-medium mb-2">Preferences:</label>
          <input
            id="preferences"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            value={preferences}
            onChange={handlePreferencesChange}
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="companySize" className="block font-medium mb-2">Size of Company:</label>
          <select
            id="companySize"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={companySize}
            onChange={handleCompanySizeChange}
          >
             <option value="Small">Small</option>
            <option value="Mid">Mid</option>
            <option value="Large">Large</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNo" className="block font-medium mb-2">Phone No:</label>
          <input
            id="phoneNo"
            type="tel"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={phoneNo}
            onChange={handlePhoneNoChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block font-medium mb-2">Description (Bio):</label>
          <textarea
            id="bio"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="5"
            value={bio}
            onChange={handleBioChange}
          ></textarea>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
      <Footerlabour/>
    </>
  );
};

export default Employerpage;

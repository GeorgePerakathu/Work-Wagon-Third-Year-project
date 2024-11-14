import React, { useState } from 'react';
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';
import customFetch from '../utils/customFetch';
import { useParams } from 'react-router-dom'; // 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequirementsPage = () => {
  const { jobId } = useParams(); 
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [designPreference, setDesignPreference] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [images, setImages] = useState([]);
   const[formData,setformData]= useState([]);
   const navigate = useNavigate();
  const handleProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleDesignPreferenceChange = (e) => {
    setDesignPreference(e.target.value);
  };

  const handleAdditionalInformationChange = (e) => {
    setAdditionalInformation(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleProceed = async () => {
    try {
      const formData = {
        jobId, 
        projectTitle,
        projectDescription,
        deadline,
        budget,
        designPreference,
        additionalInformation,
      };
      const response = await customFetch.post("/Requirementsflps", formData);
      console.log("Server response:", response);
      setProjectTitle('');
      setProjectDescription('');
      setDeadline('');
      setBudget('');
      setDesignPreference('');
      setAdditionalInformation('');
      setImages([]);
      toast.success("Requirement submitted successfully");
      navigate("/categories/infogrid/checkout");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  

  return (
    <div>
    <Navbar/>
    <div className="containers mx-auto p-4 w-2/4">
      <h1 className="text-2xl font-bold mb-4">Project Requirements</h1>
      <div className="mb-4">
      <h1 hidden>Job ID: {jobId}</h1>
        <label htmlFor="projectTitle" className="block font-medium mb-2">Project Title:</label>
        <input
          id="projectTitle"
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={projectTitle}
          onChange={handleProjectTitleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="projectDescription" className="block font-medium mb-2">Project Description:</label>
        <textarea
          id="projectDescription"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="5"
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="deadline" className="block font-medium mb-2">Deadline:</label>
          <input
            id="deadline"
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </div>
        <div>
          <label htmlFor="budget" className="block font-medium mb-2">Budget:</label>
          <input
            id="budget"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={budget}
            onChange={handleBudgetChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="designPreference" className="block font-medium mb-2">Design Preference:</label>
        <textarea
          id="designPreference"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="3"
          value={designPreference}
          onChange={handleDesignPreferenceChange}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="additionalInformation" className="block font-medium mb-2">Additional Information:</label>
        <textarea
          id="additionalInformation"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="3"
          value={additionalInformation}
          onChange={handleAdditionalInformationChange}
        ></textarea>
      </div>
      <h3>Upload Sample Images:</h3>
      <div className="flex flex-wrap -mx-2 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24 mx-2 mb-2">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              onClick={() => handleRemoveImage(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 10a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v4zm-2-7a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <label
        htmlFor="uploadImages"
        className="bg-white text-center rounded w-full sm:w-[360px] min-h-[160px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 mb-6 fill-gray-400"
          viewBox="0 0 24 24"
        >
          <path
            d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
          />
          <path
            d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
          />
        </svg>
        <p className="text-gray-400 font-semibold text-sm">
          Drag & Drop or{' '}
          <span className="text-[#007bff]">Choose file</span> to upload
        </p>
        <input
          type="file"
          id="uploadImages"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-xs text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </label>
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
    </div>
  );
};

export default RequirementsPage;


  

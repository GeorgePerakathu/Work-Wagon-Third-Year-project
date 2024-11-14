import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Footerlabour from "./Footerlabour";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseapp.js";

const Bidregister = () => {
  const [companyName, setCompanyName] = useState("");
  const [requirement, setrequirement] = useState("");
  const [minThreshold, setMinThreshold] = useState("");
  const [maxThreshold, setMaxThreshold] = useState("");
  const [amount, setAmount] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleNumOfPagesChange = (e) => {
    setrequirement(e.target.value);
  };

  const handleMinThresholdChange = (e) => {
    setMinThreshold(e.target.value);
  };

  const handleMaxThresholdChange = (e) => {
    setMaxThreshold(e.target.value);
  };
  const handleImageChange = async (e) => {
      try {
        const imageFile = e.target.files[0];
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${Math.floor(
          Math.random() * 1000000
        )}`;

        const storageRef = ref(storage, `bidimg`);
        const imageRef = ref(storageRef, uniqueFileName);

        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        setUrl(imageUrl);
          /*setFormData({
            ...formData,
            profileImage: imageUrl,
          });
          */
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
        toast.error("Image upload failed");
      }
    };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };


  const handleProceed = async () => {
    try {
      const formData = {
        companyName,
        requirement,
        minThreshold,
        maxThreshold,
        amount,
        projectTitle,
        startDate,
        endDate,
        url,
      };
      const response = await customFetch.post("/BidRegisterflps", formData);
      console.log("Server response:", response);
      setCompanyName("");
      setrequirement("");
      setMinThreshold("");
      setMaxThreshold("");
      setAmount("");
      setProjectTitle("");
      setStartDate("");
      setEndDate("");
      setUrl("");
      toast.success("Bid uploaded successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="containers mx-auto p-4 w-2/4">
        <h1 className="text-2xl font-bold mb-4">Bid Register</h1>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-medium mb-2">
            Company Name:
          </label>
          <input
            id="companyName"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numOfPages" className="block font-medium mb-2">
            Requirements:
          </label>
          <input
            id="numOfPages"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={requirement}
            onChange={handleNumOfPagesChange}
          />
        </div>
        <div className="flex mb-4 ">
          <div className="mr-4">
            <label htmlFor="minThreshold" className="block font-medium mb-2">
              Min Threshold:
            </label>
            <input
              id="minThreshold"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={minThreshold}
              onChange={handleMinThresholdChange}
            />
          </div>
          <div>
            <label htmlFor="maxThreshold" className="block font-medium mb-2">
              Max Threshold:
            </label>
            <input
              id="maxThreshold"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={maxThreshold}
              onChange={handleMaxThresholdChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-2">
            Amount:
          </label>
          <input
            id="amount"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectTitle" className="block font-medium mb-2">
            Project Title:
          </label>
          <input
            id="projectTitle"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={projectTitle}
            onChange={handleProjectTitleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block font-medium mb-2">
              Start Date:
            </label>
            <input
              id="startDate"
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-2">
              End Date:
            </label>
            <input
              id="endDate"
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <h3>Upload Images:</h3>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="relative w-24 h-24 mx-2 mb-2">
            {url && (
              <img
                src={url}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            )}
            
          </div>
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
            <path d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z" />
            <path d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z" />
          </svg>
          <p className="text-gray-400 font-semibold text-sm">
            Drag & Drop or <span className="text-[#007bff]">Choose file</span>{" "}
            to upload
          </p>
          <input
            type="file"
            id="uploadImages"
            className="hidden"
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
      <Footerlabour />
    </div>
  );
};

export default Bidregister;

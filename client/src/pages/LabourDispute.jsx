import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Navlabour from "../Components/Navlabour";
import Footerlabour from '../Components/Footerlabour';
import customFetch from "../utils/customFetch.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const LabourDispute = ({ onSubmit }) => {
  // const [disputeDetails, setDisputeDetails] = useState({
  //   customerName: "",
  //   orderNumber: "",
  //   disputeReason: "",
  //   disputeDescription: "",
  //   images: [],
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDisputeDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [name]: value,
  //   }));
  // };

  const [uin, setUin] = useState("");
  const [jobId, setJobId] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");

  // const [disputeDetails, setDisputeDetails] = useState({
  //   customerName: '',
  //   orderNumber: '',
  //   disputeReason: '',
  //   disputeDescription: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDisputeDetails({ ...disputeDetails, [name]: value });
  // };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setDisputeDetails((prevDetails) => ({
      ...prevDetails,
      images,
    }));
  };

  const uploadImagesToFirebaseStorage = async () => {
    try {
      const storage = getStorage();
      const imageUrls = await Promise.all(
        disputeDetails.images.map(async (image, index) => {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}${index}`;

          const storageRef = ref(storage, `images`);
          const imageRef = ref(storageRef, uniqueFileName);

          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );

      return imageUrls;
    } catch (error) {
      console.error("Error uploading images to Firebase Storage:", error);
      throw error;
    }
  };

  const handleUploadImages = async () => {
    try {
      const imageUrls = await uploadImagesToFirebaseStorage();

      setDisputeDetails((prevDetails) => ({
        ...prevDetails,
        images: imageUrls,
      }));

      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Image upload failed");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const imageUrls = await uploadImagesToFirebaseStorage();

  //     setDisputeDetails((prevDetails) => ({
  //       ...prevDetails,
  //       images: imageUrls,
  //     }));

  //     console.log("After appending image URLs:", disputeDetails);
  //     // Adjust the API endpoint and request method as needed
  //     // await customFetch.post("/disputes", disputeDetails);

  //     toast.success("Dispute submitted successfully");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Operation failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const disputeData = {
        uin, 
        jobId, 
        disputeReason, 
        disputeDescription
      };
      await customFetch.post("/labour/dispute", disputeData);
      console.log('Dispute submitted successfully');
      // Optionally, reset the form or perform any other action upon successful submission
    } catch (error) {
      console.error('Error:', error);
      console.error('Failed to submit dispute');
    }
  };
  
  return (
    <>
      <Navlabour />
      <div className="flex justify-center items-center h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black rounded-lg p-5 max-w-md relative"
        >
          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Uid No.:
              <input
                type="text"
                name="uin"
                value={uin}
                onChange={(e) => setUin(e.target.value)}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Job id:
              <input
                type="number"
                name="jobId"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Dispute Reason:
              <input
                type="text"
                name="disputeReason"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Dispute Description:
              <textarea
                name="disputeDescription"
                value={disputeDescription}
                onChange={(e) => setDisputeDescription(e.target.value)}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                rows="3"
              />
            </label>
          </div>

          {/* <div className="mb-5">
            <label className="block mb-2 text-lg">
              Images:
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                accept=".jpg, .jpeg"
                multiple
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div> */}

          <div className="flex">
            {/* <button
              type="button"
              onClick={handleUploadImages}
              className="bg-blue-500 text-white px-4 py-2 text-lg rounded cursor-pointer mr-4"
            >
              Upload Images
            </button> */}

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 text-lg rounded cursor-pointer"
            >
              Submit Dispute
            </button>
          </div>
        </form>
      </div>

      <Footerlabour />
    </>
  );
};

export default LabourDispute;

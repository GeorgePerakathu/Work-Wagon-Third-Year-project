import React, { useState } from "react";
import { toast } from "react-toastify"; // Add this import
import Navlabour from "./Navlabour";
import Footerlabour from "./Footerlabour";
import customFetch from "../utils/customFetch.js";
import { storage } from "../firebaseapp.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const JobForm = ({ onSubmit }) => {
 const [jobDetails, setJobDetails] = useState({
   sitename: "",
   description: "",
   jobrole: "",
   jobLocation: "",
   jobPincode: "",
   price: "",
   images: [],
 });

 const handleChange = (e) => {
   const { name, value } = e.target;
   setJobDetails((prevDetails) => ({
     ...prevDetails,
     [name]: value,
   }));
 };

 const handleImageChange = (e) => {
   const images = Array.from(e.target.files);
   setJobDetails((prevDetails) => ({
     ...prevDetails,
     images,
   }));
 };

 const uploadImagesToFirebaseStorage = async () => {
   try {
     const storage = getStorage();
     const imageUrls = await Promise.all(
       jobDetails.images.map(async (image, index) => {
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
      // Upload images to Firebase Storage
      const imageUrls = await uploadImagesToFirebaseStorage();

      // Update jobDetails with the image URLs
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        images: imageUrls,
      }));

      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Image upload failed");
    }
  };
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     // Upload images to Firebase Storage


     console.log("After appending image URLs:", jobDetails);
     await customFetch.post("/jobs", jobDetails);

     toast.success("Job created successfully");
   } catch (error) {
     console.error("Error:", error);
     toast.error("Operation failed");
   }
 };


  return (
    <>
      <Navlabour />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black rounded-lg p-5 max-w-3xl w-full"
        >
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-0 md:pr-5 mb-5">
              <label className="block mb-2 text-lg">
                Job Title:
                <input
                  type="text"
                  name="sitename"
                  value={jobDetails.sitename}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                />
              </label>

              <label className="block mb-2 text-lg">
                Job Description:
                <textarea
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                  rows="3"
                />
              </label>
              <label className="block mb-2 text-lg">
                Job Role:
                <textarea
                  name="jobrole"
                  value={jobDetails.jobrole}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                  rows="3"
                />
              </label>
            </div>

            <div className="w-full md:w-1/2 mb-5">
              <label className="block mb-2 text-lg">
                Address:
                <input
                  type="text"
                  name="jobLocation"
                  value={jobDetails.jobLocation}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                />
              </label>

              <label className="block mb-2 text-lg">
                Pincode:
                <input
                  type="number"
                  name="jobPincode"
                  value={jobDetails.jobPincode}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                />
              </label>

              <label className="block mb-2 text-lg">
                Price:
                <input
                  type="number"
                  name="price"
                  value={jobDetails.price}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                />
              </label>
              <div className="w-full mb-5">
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
              </div>
            </div>
          </div>

          <button
            type="button" // Set the type to "button" to prevent form submission
            onClick={handleUploadImages}
            className="bg-blue-500 text-white px-4 py-2 text-lg rounded cursor-pointer mr-4"
          >
            Upload Images
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 text-lg rounded cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <Footerlabour />
    </>
  );
};

export default JobForm;

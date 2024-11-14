import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from '../Navbar';
import Footerlabour from '../Footerlabour';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const FEditDispute = ({ onSubmit }) => {
  const [disputeDetails, setDisputeDetails] = useState({
    customerName: "",
    orderNumber: "",
    disputeReason: "",
    disputeDescription: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisputeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadImagesToFirebaseStorage();

      setDisputeDetails((prevDetails) => ({
        ...prevDetails,
        images: imageUrls,
      }));

      console.log("After appending image URLs:", disputeDetails);
      // Adjust the API endpoint and request method as needed
      // await customFetch.post("/disputes", disputeDetails);

      toast.success("Dispute submitted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Operation failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black rounded-lg p-5 max-w-md relative"
        >
          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={disputeDetails.customerName}
                onChange={handleChange}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Order Number:
              <input
                type="Number"
                name="orderNumber"
                value={disputeDetails.orderNumber}
                onChange={handleChange}
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
                value={disputeDetails.disputeReason}
                onChange={handleChange}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-lg">
              Dispute Description:
              <textarea
                name="disputeDescription"
                value={disputeDetails.disputeDescription}
                onChange={handleChange}
                className="px-3 py-2 mt-1 w-full border rounded-md text-sm"
                rows="3"
              />
            </label>
          </div>

          <div className="mb-5">
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

          <div className="flex">
            <button
              type="button"
              onClick={handleUploadImages}
              className="bg-blue-500 text-white px-4 py-2 text-lg rounded cursor-pointer mr-4"
            >
              Upload Images
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 text-lg rounded cursor-pointer"
            >
              Update Dispute
            </button>
          </div>
        </form>
      </div>

      <Footerlabour />
    </>
  );
};

export default FEditDispute;

// BidModal.js
import React, { useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from "react-toastify";
const BidModal = ({ isOpen, onClose, auctionDetails }) => {
  const { imageSrc, title, createdByImage, createdBy, currentBid, Description,bidId } = auctionDetails;
  const [bidAmount, setBidAmount] = useState('');

  const handlePlaceBid = async () => {
    try {
      const formData = {
      bidId,bidAmount
      };
      const response = await customFetch.post("/Bidflps", formData);
      console.log("Server response:", response);
      toast.success("Bid placed successfully!");
      setBidAmount('');
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
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-6 rounded-md max-w-lg">
        {imageSrc && <img src={imageSrc} alt={title} className="w-48 h-48 object-cover mb-4 rounded-md mx-auto" />}
        <h2 className="text-lg font-semibold mb-2 text-blue-800 text-center">{title}</h2>
        <div className="details text-center">
          {createdByImage && (
            <p className="text-sm text-gray-700 mb-2 flex items-center justify-center">
               <span className='text-center'>BidId:{bidId}</span>
              <div className="w-8 h-8 overflow-hidden rounded-full mr-4">
                <img src={createdByImage} alt="Profile Pic" className="w-full h-full object-cover" />
              </div>
              <span className='text-center'>Created by:</span>
              <span className="ml-2"><span className='font-bold'>{createdBy}</span></span>
            </p>
          )}
          {currentBid && <p className="text-sm text-gray-700 mb-2 text-center">Current Bid: <span className='font-bold'>{currentBid}</span></p>}
          <p className="text-sm text-gray-700 mb-4 text-center">Requirement: <span className='font-bold'>{Description}</span></p> {/* Render requirement */}
          <label htmlFor="bidAmount" className="block text-sm text-gray-700 mb-2">
            Enter Bid Amount:
          </label>
          <input
            id="bidAmount"
            type="number"
            placeholder="Enter Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full border p-2 mb-4 rounded-md"
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePlaceBid}
          >
            Place Bid
          </button>
          <button
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;


// AuctionCard.js

import React from 'react';
import img1 from '../assets/pfp.jpg';

const UpAuctionCard = ({ imageSrc, title, createdBy }) => {
  return (
    <div className="bg-blue-200 p-4 rounded-md text-center">
      <img src={imageSrc} alt={title} className="w-full h-32 object-cover mb-2 rounded-md" />
      <h2 className="text-lg font-semibold mb-2 text-blue-800 text-center">{title}</h2>
        <p className="text-sm text-gray-700 mb-2 flex items-center mx-auto">
          <div className="w-8 h-8 overflow-hidden rounded-full mr-4">
              <img src={img1} alt="Profile Pic" className="w-full h-full object-cover" />
          </div>
            <span className='text-center ml-3'>Created by:</span>
            <span className="ml-2"><span className='font-bold'>{createdBy}</span></span>
          </p>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Details</button>
    </div>
  );
};

export default UpAuctionCard;

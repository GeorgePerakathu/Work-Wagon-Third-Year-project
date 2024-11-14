import React, { useState, useEffect } from 'react';
import AuctionCard from './AuctionCard';
import UpAuctionCard from './UpAuctionCard';
import Navbar from '../Components/Navbar';
import Footerlabour from '../Components/Footerlabour';
import customFetch from '../utils/customFetch';

const Bid = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get('/bid-register');
        if (Array.isArray(response.data)) {
          console.log(response.data);
          setBids(response.data);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };
    fetchData();
   
  }, []); 
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Live Auction</h1>
          <div className="bg-white p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bids.map((bid, index) => (
                <AuctionCard
                  key={index}
                  imageSrc={bid.url} 
                  title={bid.projectTitle} 
                  createdBy={bid.companyName} 
                  currentBid={`$${bid.amount}`} 
                  Description={bid.requirement}
                  bidId={bid.bidId}
                />
              ))}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Upcoming Auction</h1>
          <div className="bg-white p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bids.map((bid, index) => (
                <UpAuctionCard
                  key={index}
                  imageSrc={bid.url} 
                  title={bid.projectTitle}
                  createdBy={bid.companyName}
                  //requirement={bid.requirement}
                  //currentBid={`$${bid.amount}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footerlabour />
    </>
  );
};

export default Bid;

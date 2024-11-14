import React, { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';

// Component to display all bids for a specific job posting
const BidDisplay = ({ bidId }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await customFetch.get(`/Bids/${bidId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bids');
        }
        const data = await response.json();
        setBids(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [bidId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-blue-700 mb-4">Freelancer Bids</h1>
        {bids.length === 0 ? (
          <p className="text-blue-500">No bids have been placed.</p>
        ) : (
          <ul className="space-y-4">
            {bids.map((bid, index) => (
              <li
                key={index}
                className="flex justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm"
              >
                <div className="text-lg font-semibold text-blue-700">{bid.freelancerName}</div>
                <div className="text-sm font-bold text-blue-600">{bid.bidAmount}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BidDisplay;

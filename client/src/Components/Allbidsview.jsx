import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom'; // Import useParams hook to extract parameters from URL
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';


function Allbidsview() {
    const { bidId } = useParams(); // Extract bidId from URL
    const [bids, setBids] = useState([]);

    useEffect(() => {
        async function fetchBids() {
            try {
                const response = await fetch(`/api/v1/Bids/${bidId}`); // Use the extracted bidId from URL
                if (!response.ok) {
                    throw new Error('Failed to fetch bids');
                }
                const data = await response.json();
                setBids(data);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        }

        if (bidId) { // Check if bidId is available in the URL
            fetchBids();
        }
    }, [bidId]); // Fetch bids whenever bidId changes

    // Function to generate bid names like "BID 1", "BID 2", etc.
    const generateBidName = (index) => {
        return `BID ${index + 1}`;
    };

    return (
        <div>
            <Navbar />
            <div className="overflow-x-auto sm:rounded-lg mx-40 my-20 px-4">
                <h2 className="text-3xl font-extrabold text-black mb-4 text-center">Freelancer Bids</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white rounded-lg overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bid Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={bid._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{generateBidName(index)}</div>
                                        <div className="font-normal">{bid.createdBy.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {bid.bidId}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center font-bold">
                                        {bid.bidAmount}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to='/categories/infogrid/Web%20Development'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</button></Link>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footerlabour />
        </div>
    );
}

export default Allbidsview;

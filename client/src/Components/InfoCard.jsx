import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams hook
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Filter from './filter';
import customFetch from '../utils/customFetch';

const InfoCard = () => {
  const [infoCardsData, setInfoCardsData] = useState([]);
  const { category } = useParams(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(`/projects/${category}`);
        setInfoCardsData(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [category]); 

  return (
    <div>
      <Navbar/>
      <h1 className='p-9'>Availabe Freelancer</h1>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-4">
          {infoCardsData.map((card, index) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                <Carousel showThumbs={false}>
                  {card.cardImage && card.cardImage.map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <img src={image} alt={`Image ${imageIndex + 1}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                </Carousel>
                <Link to={`/information/${card.jobId}`}>
                  <div className="px-6 py-4">
                    <div className="text-xl font-semibold mb-2">{card.title}</div>
                    <p className="text-gray-700 text-base mb-2">{card.description}</p>
                    {/* Additional data validation for the ratings property */}
                    {typeof card.ratings === 'number' && !isNaN(card.ratings) && (
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                        {card.ratings.toFixed(1)} ({card.ratingVotes})
                      </div>
                    )}
                    {/* Assuming 'price' is available in card object */}
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500 mr-1" />
                      {card.projectPlans.cost}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

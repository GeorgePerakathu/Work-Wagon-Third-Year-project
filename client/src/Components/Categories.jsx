import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import i11 from '../assets/p6.jpeg'
import i12 from '../assets/p7.jpg'
import i13 from '../assets/p8.jpg'
import i14 from '../assets/p9.png'
import Footerlabour from './Footerlabour';


const cardStyle = {
  border: '1px solid #3282B8', 
  boxShadow: '0 8px 12px -4px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',  
};

const Card = ({ imageUrl, title, to }) => (
  <Link to={`${to}/${title}`} className="w-full md:w-1/3 p-4 md:flex">
    <div className="rounded overflow-hidden" style={cardStyle}>
      <img src={imageUrl} alt={title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-center mb-2">{title}</div>
      </div>
    </div>
  </Link>
);

const Categories = () => {
  const cardsData = [
    {
      imageUrl: i14,
      title: 'Web Development',
      to: '/categories/infogrid',
    },
    {
      imageUrl: i11,
      title: 'Graphic Design',
      to: '/categories/infogrid', 
    },
    {
      imageUrl: i12,
      title: 'Photography',
      to: '/categories/infogrid', 
    },
    {
      imageUrl: i13,
      title: 'App Development',
      to: '/categories/infogrid', 
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4" style={{ backgroundColor: '#BBE1FA' }}>
      <h1 className="text-4xl font-bold mb-4">Categories</h1>
      <div className="flex flex-wrap -mx-4">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
    <Footerlabour/>
    </>
  );
  
};

export default Categories;

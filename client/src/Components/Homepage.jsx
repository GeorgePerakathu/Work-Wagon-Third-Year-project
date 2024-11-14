import React from 'react';

const cardsData = [
  {
    backgroundImage: 'url("path/to/first-image.jpg")',
    title: 'Card 1 Title',
    animationClass: 'transform hover:scale-105 transition-transform duration-300 ease-in-out',
    backgroundColor: 'bg-blue-500',
  },
  {
    backgroundImage: 'url("path/to/second-image.jpg")',
    title: 'Card 2 Title',
    animationClass: 'transform hover:scale-105 transition-transform duration-300 ease-in-out',
    backgroundColor: 'bg-green-500',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-screen flex space-x-8">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`w-5/12 rounded-xl shadow-lg ${card.animationClass} ${card.backgroundColor} m-4 mx-auto ${index === cardsData.length - 1 ? 'mr-4' : ''}`} // Add right margin to the last card
            style={{
              backgroundImage: card.backgroundImage,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              height: '80vh', // Set the card height to 80% of the viewport height
            }}
          >
            <h2 className="text-white text-xl font-bold text-center">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

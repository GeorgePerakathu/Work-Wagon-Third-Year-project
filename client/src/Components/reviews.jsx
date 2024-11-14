import React from 'react';
import './style.css'; // Import your main CSS file
import './mediaqueries.css';
import './reviews.css'
import img from '../assets/pfp.jpg'

const ReviewsSection = () => {
  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        profilePic: {img}, // Replace with the actual image path
      },
      comment: 'Great service! I highly recommend it.',
      rating: 5, // Rating out of 5
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        profilePic: {img}, // Replace with the actual image path
      },
      comment: 'Good experience overall.',
      rating: 4, // Rating out of 5
    },
    {
        id: 3,
        user: {
          name: 'Prashant Patil',
          profilePic: {img}, // Replace with the actual image path
        },
        comment: 'Worst experience, did not pay him at all, I am following the footsteps of my master reddy #75dayhardchallenge #reddy4life',
        rating: 1, // Rating out of 5
    },
    {
        id: 4,
        user: {
          name: 'Ross Geller',
          profilePic: {img}, // Replace with the actual image path
        },
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis reprehenderit et laborum, rem, dolore eum quod voluptate exercitationem nobis, nihil esse debitis maxime facere minus sint delectus velit in eos quo officiis explicabo deleniti dignissimos. Eligendi illum libero dolorum cum laboriosam corrupti quidem, reiciendis ea magnam? Nulla, impedit fuga!Good experience overall.',
        rating: 4, // Rating out of 5
    },
  ];

  return (
    <section id="reviews">
      <div className='hi02'>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="user-profile">
              <img
                src={img}
                alt={review.user.name}
                className="profile-pic"
              />
              <div className="user-name">{review.user.name}</div>
            </div>
            <div className="review-content">
              <p>{review.comment}</p>
              <div className="rating">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="icon">★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

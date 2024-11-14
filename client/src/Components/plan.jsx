import React from 'react';
import { Link } from 'react-router-dom';
import './plan.css';

const PlanCard = ({ name, description, cost, jobId }) => (
  <div className="plan-card">
    <h3 className="plan-title">{name}</h3>
    <p className="plan-price">₹{cost} per month</p>
    <p className="plan-description">{description}</p>
    <Link to={`/requirements/${jobId}`}> {/* Use jobId in URL */}
      <button className="plan-button">Select Plan</button>
    </Link>
  </div>
);

const PlanCards = ({ projectPlans, jobId }) => {
  return (
    <div className="plan-cards">
      {projectPlans.map((plan, index) => (
        <PlanCard
          key={index}
          name={plan.name}
          description={plan.description}
          cost={plan.cost}
          jobId={jobId} 
        />
      ))}
    </div>
  );
};

export default PlanCards;

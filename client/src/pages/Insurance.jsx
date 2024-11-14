import React, { useState } from "react";
import Navlabour from "../Components/Navlabour";
import Footerlabour from "../Components/Footerlabour";
const InsuranceCard = ({ plan }) => {
  return (
    <div className="bg-blue-100 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
      <p className="text-gray-700 mb-2">{plan.description}</p>
      <p className="text-blue-500 font-semibold mb-2">{plan.premium}</p>
      <p className="text-gray-700 mb-2">{plan.coverage}</p>
      <p className="text-gray-700 mb-2">Duration: {plan.duration}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Buy Now
      </button>
    </div>
  );
};

const InsurancePage = () => {
  const [selectedInsuranceType, setSelectedInsuranceType] = useState("All");
  const [selectedOccupation, setSelectedOccupation] = useState("All");

  const insurancePlans = [
    {
      name: "Basic Coverage",
      description: "Provides essential coverage for common labor injuries.",
      premium: "$20/month",
      coverage: "Injury coverage, medical expenses",
      duration: "1 year",
      type: "Injury Coverage",
      occupation: "Construction",
    },
    {
      name: "Medium Coverage",
      description: "Offers moderate coverage for diverse labor-related risks.",
      premium: "$40/month",
      coverage: "Injury coverage, disability, medical expenses",
      duration: "2 years",
      type: "Medium Coverage",
      occupation: "Manufacturing",
    },
    {
      name: "Full Coverage",
      description: "Comprehensive coverage for extensive labor-related risks.",
      premium: "$80/month",
      coverage: "Injury coverage, disability, medical expenses, rehabilitation",
      duration: "3 years",
      type: "Full Coverage",
      occupation: "Service Industry",
    },
   
  ];

  const insuranceTypes = [
    "All",
    ...new Set(insurancePlans.map((plan) => plan.type)),
  ];
  const occupations = [
    "All",
    ...new Set(insurancePlans.map((plan) => plan.occupation)),
  ];

  const filterPlans = () => {
    let filteredPlans = insurancePlans;
    if (selectedInsuranceType !== "All") {
      filteredPlans = filteredPlans.filter(
        (plan) => plan.type === selectedInsuranceType
      );
    }
    if (selectedOccupation !== "All") {
      filteredPlans = filteredPlans.filter(
        (plan) => plan.occupation === selectedOccupation
      );
    }
    return filteredPlans;
  };

  return (
    <>
      <Navlabour />
      <div className="container mx-auto py-8 px-4 lg:px-24">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Labor Workers Insurance
        </h1>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center mb-4">
          <select
            className="px-4 py-2 rounded-md border border-gray-300 mb-2 lg:mb-0 mr-2"
            value={selectedInsuranceType}
            onChange={(e) => setSelectedInsuranceType(e.target.value)}
          >
            {insuranceTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-md border border-gray-300 mb-2 lg:mb-0 mr-2"
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
          >
            {occupations.map((occupation, index) => (
              <option key={index} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
            Filter
          </button>
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
            Reset
          </button>
        </div>

        {/* Insurance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterPlans().map((plan, index) => (
            <InsuranceCard key={index} plan={plan} />
          ))}
        </div>
      </div>
      <Footerlabour />
    </>
  );
};

export default InsurancePage;

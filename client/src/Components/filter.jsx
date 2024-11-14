import React, { useState } from "react";
import Select from "react-select";
export default function Filter() {
  const [jobType, setJobType] = useState(null);
  const [serviceOption, setServiceOption] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [budget, setBudget] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);

  const jobTypeOptions = [
    { value: "photography", label: "Photography" },
    { value: "video editing", label: "Video Editing" },
    { value: "logo making", label: "Logo Making" },
    { value: "building website", label: "Building Website" },
    { value: "making stickers", label: "Making Stickers" },
  ];

  const budgetOptions = [
    { value: "$1-$8", label: "$1-$8" },
    { value: "$9-$10", label: "$9-$10" },
    { value: "$11-$12", label: "$11-$12" },
    { value: "$12-$13", label: "$12-$13" },
  ];

  const deliveryOptions = [
    { value: "1 day", label: "1 day" },
    { value: "2 day", label: "2 day" },
    { value: "3 day", label: "3 day" },
    { value: "7 day", label: "7 day" },
  ];

  const sellerDetailsOptions = [];

  const serviceOptions = [];
  const resetAllValues = () => {
    setJobType(null);
    setServiceOption(null);
    setDelivery(null);
    setBudget(null);
    setSellerDetails(null);
  };

  return (
    <>
      <div style={{ margin: 20 }}>
        <h1 className="text-4xl font-bold mb-4">Available Freelancers</h1>
        <div className="select-container">
          <div className="select-wrapper">
            <label>JobType</label>
            <Select
              options={jobTypeOptions}
              value={jobType}
              onChange={setJobType}
              isMulti
              isSearchable
              noOptionsMessage={() => "No Job found"}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "gray",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "red",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
            />
          </div>

          <div className="select-wrapper">
            <label>Budget</label>
            <Select
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
              isMulti
              isSearchable
              noOptionsMessage={() => "No snack found"}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "gray",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "red",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
            />
          </div>

          <div className="select-wrapper">
            <label>Service Option</label>
            <Select
              options={serviceOptions}
              value={serviceOption}
              onChange={setServiceOption}
              isMulti
              isSearchable
              noOptionsMessage={() => "No snack found"}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "gray",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "red",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
            />
          </div>

          <div className="select-wrapper">
            <label>Delivery</label>
            <Select
              options={deliveryOptions}
              value={delivery}
              onChange={setDelivery}
              isMulti
              isSearchable
              noOptionsMessage={() => "No snack found"}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "gray",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "red",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
            />
          </div>

          <div className="select-wrapper">
            <label>Seller Details</label>
            <Select
              options={sellerDetailsOptions}
              value={sellerDetails}
              onChange={setSellerDetails}
              isMulti
              isSearchable
              noOptionsMessage={() => "No snack found"}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "gray",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "red",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
            />
          </div>
        </div>
        <div id="button-container5">
          <button id="search-button5">Search</button>
          <button
            id="reset-button5"
            onClick={resetAllValues}
            class="cursor-pointer m-5 p-2 md:p-4 bg-blue-500 rounded-md text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

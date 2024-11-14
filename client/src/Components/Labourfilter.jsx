import React, { useState } from "react";
import Select from "react-select";
import "./Labourfilter.css";
import InfoCardLab from "./InfoCardLab";
import customFetch from "../utils/customFetch";

const Labourfilter = () => {
  const [sitename, setSitename] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const [jobsFound, setJobsFound] = useState(null);

  const sitenameOptions = [
    { value: "all", label: "all" },
    { value: "Welding", label: "Welding" },
    { value: "Carpentry", label: "Carpentry" },
    { value: "Painting", label: "Painting" },
    { value: "Construction", label: "Construction" },
    { value: "Electrical", label: "Electrical" },
  ];

  const resetAllValues = () => {
    setSitename(null);
    setSearchText("");
    setSearchParams({});
    setJobsFound(null);
  };

  const handleSearch = async () => {
    try {
      let params = {};

      
      if (searchText) {
        params.search = searchText;
      }
      if (sitename) {
        console.log(sitename);
    
          params.jobType = sitename[0].value.toString(); 
   

        console.log(sitename.value);
      }


      setSearchParams(params);
      setJobsFound(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobsFound(false);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h1 className="text-4xl font-bold mb-4">Available Labour Jobs</h1>
      <div className="search-container">
        <div className="select-wrapper">
          <label>Job Type</label>
          <Select
            options={sitenameOptions}
            value={sitename}
            onChange={setSitename}
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

        <div className="text-input-wrapper">
          <label>Pincode</label>
          <input
            type="number"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter Pincode"
          />
        </div>
      </div>

      <div id="button-container5">
        <button id="search-button5" onClick={handleSearch}>
          Search
        </button>
        <button id="reset-button5" onClick={resetAllValues}>
          Reset
        </button>
      </div>
      <InfoCardLab searchParams={searchParams} />
    </div>
  );
};

export default Labourfilter;

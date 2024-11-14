import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customFetch from "../utils/customFetch.js";
import Navlabour from "../Components/Navlabour";
import {AuthContext} from "../AuthContext.jsx";
const LabourSignup = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    uin: "",
    password: "",
    location: "",
    account: "Labourer",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountChange = (value) => {
    setFormData({
      ...formData,
      account: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        await customFetch.post("/auth/login", formData);
        setIsLoggedIn(true);
        toast.success("Login successful");
        navigate("/labourhomepage");
      } else {
        // Signup
        await customFetch.post("/auth/register", formData);
        toast.success("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      if (error?.response?.status === 500 && error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error("Operation failed");
      }
    }
  };

  return (
    <>
      <Navlabour />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isLogin ? "Login" : "Sign up"}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="account" className="sr-only">
                    Account Type
                  </label>
                  <select
                    id="account"
                    name="account"
                    className="block appearance-none w-full py-2 px-3 border border-gray-300 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleAccountChange(e.target.value)}
                    value={formData.account}
                  >
                    <option value="Labourer">Labourer</option>
                    <option value="Labour Agency">Labour Agency</option>
                    <option value="Employer">Employer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* Heroicon name: solid/chevron-down */}
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="uin" className="sr-only">
                    UIN
                  </label>
                  <input
                    id="uin"
                    name="uin"
                    type="text" // Change this to "text" if you want to allow non-numeric characters
                    autoComplete="uin"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="UIN"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="sr-only">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="location"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Location"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <label htmlFor="account" className="sr-only">
                    Account Type
                  </label>
                  <select
                    id="account"
                    name="account"
                    className="block appearance-none w-full py-2 px-3 border border-gray-300 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleAccountChange(e.target.value)}
                    value={formData.account}
                  >
                    <option value="Labourer">Labourer</option>
                    <option value="Labour Agency">Labour Agency</option>
                    <option value="Employer">Employer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* Heroicon name: solid/chevron-down */}
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="uin" className="sr-only">
                    UIN
                  </label>
                  <input
                    id="uin"
                    name="uin"
                    type="text" // Change this to "text" if you want to allow non-numeric characters
                    autoComplete="uin"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="UIN"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? "Login" : "Sign up"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LabourSignup;

/*
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Select, MenuItem } from "@mui/material";
import Navlabour from "../Components/Navlabour";

const LabourSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    phoneNo: "",
    password: "", // Renamed pin to password
    userType: "Labour",
  });
  const [message, setMessage] = useState(""); // Add state for the message

  const handleChange = (e) => {
    if (e.target.name === "phoneNo") {
      // Allow only numbers and limit to 10 digits
      const phoneNo = e.target.value.replace(/\D/g, "").slice(0, 10);
      setInputs((prevState) => ({
        ...prevState,
        phoneNo,
      }));
    } else if (e.target.name === "password") {
      // Allow only numbers and limit to 4 digits
      const pin = e.target.value.replace(/\D/g, "").slice(0, 4);
      setInputs((prevState) => ({
        ...prevState,
        password: pin,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      setMessage(alert("Signup successful")); // Set the message for signup
      alert("Unique Identification Number Has Assigned");
      setIsSignup(false);
    } else {
      setMessage(alert("Login successful"));
      // Set the message for login
    }
  };

  const resetState = (e) => {
    setIsSignup(!isSignup);
    setInputs({ name: "", phoneNo: "", password: "" }); // Changed pin to password
    setMessage(""); // Clear the message
  };

  const userTypes = ["Labour", "Labour Agency", "Employer"];

  return (
    <div>
      <Navlabour />

      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px blue"}
          sx={{
            ":hover": {
              boxShadow: "5px 5px 10px blue",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>

          {isSignup && (
            <TextField
              onChange={handleChange}
              value={inputs.name}
              name="name"
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Name"
            />
          )}

          <Select
            onChange={handleChange}
            value={inputs.userType}
            name="userType"
            margin="normal"
            variant="outlined"
            placeholder="Select User Type"
            fullWidth={false} // Remove fullWidth to allow manual width adjustment
            sx={{ width: "230px" }}
          >
            {userTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>

          <TextField
            onChange={handleChange}
            value={inputs.phoneNo}
            name="phoneNo"
            margin="normal"
            type={"tel"}
            variant="outlined"
            placeholder="Phone No."
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            margin="normal"
            type={isSignup ? "pin" : "password"} // Set type dynamically
            variant="outlined"
            placeholder={isSignup ? "Enter 4-digit pin" : "Enter Pin"} // Update placeholder
          />

          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3, borderRadius: 3 }}>
            Change to {isSignup ? "Login" : "Signup"}?
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LabourSignup;
*/

import React, { useState,useContext} from "react";
import image1 from "../assets/coding.png";
import image2 from "../assets/businessman.png";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customFetch from "../utils/customFetch.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./responsive.css";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isFreelancer, setIsFreelancer] = useState(true);
  const { isUserSignedIn, setIsUserSignedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  var image3 = image1;
  var image4 = image2;

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setPassword("");
    setConfirmPassword("");
  };

  const handleFreelancerMode = () => {
    setIsFreelancer(true);
  };

  const handleEmployerMode = () => {
    setIsFreelancer(false);
  };

  const handleLogin = async () => {
    try {
      const formData = {
        email,
        password,
      };

      await customFetch.post("/flp/auth/login", formData);
      toast.success("Login successful");
      setIsUserSignedIn(true);
      navigate("/freelancehome");
    } catch (error) {
      toast.error("Login failed");
    }
  };
  const handleRegistration = async () => {
    try {
      let formData = {
        email,
        password,
        account: isFreelancer ? "Freelancer" : "Employer",
      };

      if (isSignUp) {
        formData.name = name;
      }

      await customFetch.post("/flp/auth/register", formData);
      toast.success("Registration successful. Please login.");
      setIsSignUp(true);
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleRegistration();
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-screen bg-gray-100 rounded"
        id="sign-0"
      >
        <p className="text-4xl font-bold " id="sign-4">
          {isSignUp ? "Register" : "Login"}
        </p>
        <div
          className="bg-white p-8 rounded shadow-md w-2/4 h-auto mt-4"
          id="sign-1"
        >
          <div className="flex space-x-2 pb-5 pl-48" id="sign-2">
            <button
              className={`py-3 px-4 rounded-full text-2xl flex  ${
                isFreelancer
                  ? "bg-blue-300 text-black"
                  : "bg-transparent text-black"
              }`}
              onClick={handleFreelancerMode}
            >
              <img src={image3} alt="image1" className="w-9 h-7 pr-2" />{" "}
              Freelancer
            </button>

            <button
              className={`py-3 px-4 rounded-full text-2xl flex  ${
                isFreelancer
                  ? "bg-transparent  text-black "
                  : "bg-blue-300 text-black"
              }`}
              onClick={handleEmployerMode}
            >
              <img src={image4} alt="image1" className="w-9 h-7 pr-2" />{" "}
              Employer
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-4">
            {isSignUp ? "Register" : "Login"} as{" "}
            {isFreelancer ? "Freelancer" : "Employer"}
          </h2>
          {isSignUp && (
            <input
              type="name"
              placeholder="Name"
              className="w-full border rounded-lg py-4 px-4 mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg py-4 px-4 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg py-4 px-4 mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg py-4 px-4 mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button
            className="w-full bg-blue-500 text-white py-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {isSignUp ? "Register" : "Login"}
          </button>
          <div
            className="mt-4 text-blue-500 cursor-pointer"
            onClick={handleToggle}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;

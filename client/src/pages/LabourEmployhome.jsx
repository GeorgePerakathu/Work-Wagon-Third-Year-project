import React from "react";
import { Link } from "react-router-dom";
import img2 from "../assets/paymentsbutton.svg";
import img1 from "../assets/modifyjob.svg";
import img3 from "../assets/modifyjob1.svg";
import jobapp from "../assets/jobapplications.svg";
import Navlabour from "../Components/Navlabour";
import Footerlabour from "../Components/Footerlabour";

const LabourEmployhome = () => {
  return (
    <>
      <Navlabour />

      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="flex justify-center items-center flex-wrap">
          <Link to="/modify-jobs">
            <div className="w-72 h-72 m-4 p-6 rounded-lg border-4 border-blue-900 bg-blue-200 hover:bg-blue-300 transform transition duration-300 hover:scale-105">
              <img
                src={img1}
                alt="Card 1"
                className="w-40 h-40 object-contain rounded-lg mx-auto mb-4"
              />
              <strong className="block text-center text-lg font-bold">
                Add Jobs List
              </strong>
            </div>
          </Link>
          <Link to="/joblist">
            <div className="w-72 h-72 m-4 p-6 rounded-lg border-4 border-blue-900 bg-blue-200 hover:bg-blue-300 transform transition duration-300 hover:scale-105">
              <img
                src={img3}
                alt="Card 1"
                className="w-40 h-40 object-contain rounded-lg mx-auto mb-4"
              />
              <strong className="block text-center text-lg font-bold">
                Modify Jobs List
              </strong>
            </div>
          </Link>
          <Link to="/employerjobs">
            <div className="w-72 h-72 m-4 p-6 rounded-lg border-4 border-blue-900 bg-blue-200 hover:bg-blue-300 transform transition duration-300 hover:scale-105">
              <img
                src={jobapp}
                alt="Card 1"
                className="w-40 h-40 object-contain rounded-lg mx-auto mb-4"
              />
              <strong className="block text-center text-lg font-bold">
                Manage Job Applications
              </strong>
            </div>
          </Link>
          <Link to="/payment-init">
            <div className="w-72 h-72 m-4 p-6 rounded-lg border-4 border-blue-900 bg-blue-200 hover:bg-blue-300 transform transition duration-300 hover:scale-105">
              <img
                src={img2}
                alt="Card 2"
                className="w-40 h-40 object-contain rounded-lg mx-auto mb-4"
              />
              <strong className="block text-center text-lg font-bold">
                Payment Initialization List
              </strong>
            </div>
          </Link>
        </div>
      </div>

      <Footerlabour />
    </>
  );
};

export default LabourEmployhome;

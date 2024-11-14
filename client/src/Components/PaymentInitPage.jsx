import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Modal from "react-modal";
import "./PaymentInitPage.css";
// import '../pages/FreelanceDash.css';
import Navlabour from "./Navlabour";
import Footerlabour from "./Footerlabour";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

const TABLE_HEAD = ["UIN", "Name", "Job_Id", "Job_Name", "Job_Role", "Action"];

function PaymentInitPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);

  const openModal = (row) => {
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setModalIsOpen(false);
    setOtp("");
    setOtpGenerated(false);
    setOtpVerified(false);
    setErrorMessage("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await customFetch.get("/finalApplicants");

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const generateOTP = async () => {
    try {
      const { UIN } = selectedRow;
      const phoneNumber = "+91" + UIN;
      const response = await customFetch.post("/send-sms", {
        to: phoneNumber,
      });

      if (response.data && response.data.message === "OTP sent successfully") {
        toast.success("OTP Generated successfully");
        setOtpGenerated(true);
      } else {
        toast.error("Failed to generate OTP");
        console.error("Failed to generate OTP");
      }
    } catch (error) {
      console.error("Error generating OTP:", error.message);
    }
  };

  const submitPayment = async () => {
    try {
      const { UIN, Name, Job_Id,Job_Name,Job_Role } = selectedRow;
      const phoneNumber = "+91" + UIN;
      const otpVerificationResponse = await customFetch.post("/verify-otp", {
        to: phoneNumber,
        otp,
      });

      if (
        otpVerificationResponse.data &&
        otpVerificationResponse.data.message === "OTP verification successful"
      ) {
        toast.success("OTP verified successfully");
        console.log("OTP verification successful");
        setOtpVerified(true);

        const paymentResponse = await customFetch.post("/store-payment", {
          UIN,
          Name,
          Job_Id,
          Job_Name,
          Job_Role,
          Payment: parseFloat(paymentAmount),
        });

        if (
          paymentResponse.data &&
          paymentResponse.data.message === "Payment successful"
        ) {
          toast.success("Payment successful");
          console.log("Payment successful");
        } else {
          toast.error("Payment Failed");
          console.error(
            "Failed to store payment data:",
            paymentResponse.error
          );
          setErrorMessage(paymentResponse.error);
        }
      } else {
        toast.error("OTP verification failed");
        console.error(
          "OTP verification failed:",
          otpVerificationResponse.error
        );
        setOtpVerified(false);
        setErrorMessage(otpVerificationResponse.error);
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
    }
  };

  return (
    <>
      <Navlabour />
      <div className="bg-blue-100 p-2 pb-4">
        <Card className=" sm:w-full md:w-4/5 overflow-scroll md:overflow-hidden  mx-auto">
        <table className="w-full h-full min-w-max table-auto text-center text-white bg-blue-800 rounded-lg">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-white-100 p-4">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ jobId, name, uin, jobName, jobRole }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-white-50";

                return (
                  <tr key={uin}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {uin}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-white-50/50`}>
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {jobId}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-white-50/50`}>
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {jobName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-white-50/50`}>
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {jobRole}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-white-50/50`}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="white"
                        className="font-medium"
                        onClick={() => openModal({ UIN: uin, Name: name, Job_Id: jobId,Job_Name: jobName,Job_Role: jobRole })}
                      >
                        Payment
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "310px", // Adjust the width as needed
              height: "280px",
              margin: "auto",
              padding: "12px",
              borderRadius: "10px"
            },
          }}
          
        >
          <div className=" m-3">
            <label className="">
              Payment Amount:
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={{
                border: "1px solid black",
                borderRadius: "8px", // Adjust the border radius for curved edges
                padding: "6px",
              }}
            />
          </div>
          <div className=" m-3">
            <label className="mr-6">
              OTP:
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                border: "1px solid black",
                borderRadius: "8px", // Adjust the border radius for curved edges
                padding: "5px",
                margin: "2px",
              }}
            />
          </div>
          <div className="pt-3 pl-3">
          {!otpGenerated ? (
            <button className="otp-button" onClick={generateOTP}>
              Generate OTP
            </button>
          ) : (
            <button className="otp-button" disabled>
              OTP Generated
            </button>
          )}
          <button className="submit-button" onClick={submitPayment}>
            Submit
          </button>

          {/* Display OTP verification message */}
          {otpVerified && <p>OTP verified successfully!</p>}
          {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Modal>
      </div>
      <Footerlabour />
    </>
  );
}

export default PaymentInitPage;

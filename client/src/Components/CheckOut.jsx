import React, { useState,useEffect } from "react";
import Footerlabour from "./Footerlabour";
import Navbar from "./Navbar";
import image55 from "../assets/13.jpg";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState({});
    const navigate = useNavigate();
  useEffect(() => {
    const fetchpaymentMethod = async () => {
      try {
        const response = await customFetch.get("/requirements");
        console.log(response.data);
        setPaymentMethod(response.data);
        console.log(paymentMethod);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };

    fetchpaymentMethod();
  }, []);
  
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

const handleOrderSubmit = async (event) => {
  event.preventDefault();


  try {
    const response = await customFetch.post("/checkoutflps", {
      TrackId: paymentMethod.TrackId,
      jobId: paymentMethod.jobId,
      budget: paymentMethod.budget,
    });
    console.log(response);
    toast.success("Order submitted successfully");
    navigate("/freelancehome");
  } catch (error) {
    console.error("Error submitting data:", error);
    let errorMessage = "An error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage);
  }
};
  return (
    <>
      <Navbar />
      <div className="relative mx-auto w-full bg-blue-200">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-10 lg:col-span-6 lg:py-12">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700  sm:text-3xl">
                Checkout
                <span className="mt-2 block h-1 w-10 bg-blue-900 sm:w-20"></span>
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Job Id
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={paymentMethod.jobId}
                    name="email"
                    placeholder="john.capler@fang.com"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    User Id
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={paymentMethod.userId}
                    name="email"
                    placeholder="john.capler@fang.com"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Amount
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={paymentMethod.budget}
                    name="email"
                    placeholder="john.capler@fang.com"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="payment-method"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Payment Method
                  </label>
                  <select
                    id="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="card">Credit Card</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
                {paymentMethod === "card" && (
                  <>
                    <div className="relative ">
                      <label
                        htmlFor="card-number"
                        className="text-xs font-semibold mr-48 text-gray-500"
                      >
                        Card number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          placeholder="1234-5678-XXXX-XXXX"
                          className="block w-full rounded border-gray-300 bg-gray-50 py-3 mr-2 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold  text-gray-500"
                        >
                          Name On The Card
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          className=" block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div className="mr-6 flex flex-wrap">
                      <div className="my-1">
                        <label
                          htmlFor="cvv"
                          className="text-xs font-semibold text-gray-500"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                          className="block w-20 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div className="my-1 ml-3">
                        <label
                          htmlFor="expiration-month"
                          className="text-xs font-semibold text-gray-500"
                        >
                          Expiration Date
                        </label>
                        <div className="flex ">
                          <input
                            type="text"
                            id="expiration-month"
                            name="expiration-month"
                            placeholder="MM"
                            className="block w-16 rounded border-gray-300 bg-gray-50 py-3 mr-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                          />
                          <input
                            type="text"
                            id="expiration-year"
                            name="expiration-year"
                            placeholder="YYYY"
                            className="block w-20 rounded border-gray-300 bg-gray-50 py-3 mr-3  px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {paymentMethod === "upi" && (
                  <div>
                    <label
                      htmlFor="upi-id"
                      className="text-xs font-semibold text-gray-500"
                    >
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      name="upi-id"
                      placeholder="example@upi"
                      className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}
                {/* ... (Remaining fields) */}
              </form>
              <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <a
                  href="#"
                  className="whitespace-nowrap text-blue-900 underline hover:text-blue-900"
                >
                  Terms and Conditions
                </a>
              </p>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-blue-900 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                onClick={handleOrderSubmit}
              >
                Place Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-8 m-10 rounded-3xl sm:py-4 lg:col-span-4 lg:py-6">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-900 to-blue-900 opacity-95"></div>

            <div className="relative">
              <h1 className="mb-5 text-lg font-bold text-cyan-50">
                Order summary
              </h1>
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img src={image55} alt="" className="max-h-20" />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        Build Basic Web Development
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        5 Pages
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">Rs. 500.99</p>
                </li>
                {/* ... (Additional items) */}
              </ul>
              <br />
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img src={image55} alt="" className="max-h-20" />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        Build Basic Web Development
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        5 Pages
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">Rs. 500.99</p>
                </li>
                {/* ... (Additional items) */}
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>Rs. 1060.99</span>
                </p>
                <p className="flex justify-between text-sm font-medium text-white">
                  <span>Tax :</span>
                  <span>Rs. 60.00</span>
                </p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm text-white font-semibold">
                +91 90044 18477{" "}
                <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm text-white font-semibold">
                marcusmic01@gmail.com{" "}
                <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs text-white font-medium">
                Call us now for payment related issues
              </p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span className="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      ) ;
      <Footerlabour />
    </>
  );
};

export default CheckOut;

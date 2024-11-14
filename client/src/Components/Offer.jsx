import React from "react";
import p5 from "../assets/p5.png";
import { BiWorld } from "react-icons/bi";
import { BsHeadphones, BsPerson } from "react-icons/bs";

const Offer = () => {
  const data = [
    {
      text: "User-friendly Experience",
      icon: <BsPerson />,
      color: "bg-red-500 text-white",
    },
    {
      text: "Best Services Provided For You",
      icon: <BiWorld />,
      color: "bg-green-500 text-green-500",
    },
    {
      text: "24/7 Strong Customer Support",
      icon: <BsHeadphones />,
      color: "bg-yellow-500 text-yellow-500",
    },
  ];

  return (
    <section className="bg-gray-100 container py-16 " id="offer">
      <div className="container mx-auto flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="image">
          <img src={p5} alt="lighthouse" className="h-96 md:h-auto" />
        </div>
        <div className="content">
          <div className="title mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              We are Offering Jobs to your Nearest Location
            </h1>
          </div>
          <ul className="list">
            {data.map(({ text, icon, color }) => {
              return (
                <li key={text} className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${color}`}>{icon}</div>
                  <div className="text">
                    <h3 className="text-lg md:text-xl">{text}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Offer;

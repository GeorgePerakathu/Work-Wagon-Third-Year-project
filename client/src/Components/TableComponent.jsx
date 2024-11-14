import React, { useState, useEffect } from "react";
import "./TableComponent.css";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify"; // Add this import
import Navlabour from "./Navlabour";
import Footerlabour from "./Footerlabour";

function TableComponent() {
  const [data, setData] = useState([]);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the server
async function fetchData() {
  try {
    const response = await customFetch.get("/AddDetails");

    if (response.statusText === "OK") {
      const responseData = await response.data;
      setData(responseData);
      
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}



  async function handleValues(event) {
    event.preventDefault();
    const Name = event.target.elements.name.value;
    const UIN = event.target.elements.UIN.value;

    try {
      const response = await customFetch.post("/AddDetails", {
        Name,
        UIN,
      });

      if (response.status===201 ) {
        toast.success("Member added successfully");
        fetchData();
        const savedMember = await response.json();
        setData((prevData) => [...prevData, savedMember]);
       
        
      } else {
        console.error("Error saving member:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving member:", error.message);
    }

    // Clear the form inputs
    event.target.elements.name.value = "";
    event.target.elements.UIN.value = "";
  }

  return (
    <>
    <Navlabour />
 <h1 className="m-5">Add Worker</h1>
    <form className="addForm" onSubmit={handleValues}>
          <input type="text" name="name" placeholder="Enter Name" />
          <input type="number" name="UIN" placeholder="Enter UIN" />
          <button type="submit" id="button2">
            Add
          </button>
        </form>

    <div className=" h-screen w-2/3 justify-center mx-auto items-center">
      <table className="mt-5 w-full border-b border-solid border-white rounded-xl overflow-hidden text-white">
  <tbody className="border-b border-solid border-white ">
    <tr className=" text-gray-400">
      <th className="border-b text-center p-3 text-lg bg-blue-800">Name</th>
      <th className="border-b text-center p-3 text-lg bg-blue-800">UIN</th>
      <th className="border-b text-center p-3 text-lg bg-blue-800">AgencyId</th>
    </tr>
    {data.map((member) => (
      <tr key={member._id}>
        <td className="border-b  border-solid border-white text-center p-3 text-lg bg-blue-800">{member.Name}</td>
        <td className="border-b border-solid border-white text-center p-3 text-lg bg-blue-800">{member.UIN}</td>
        <td className="border-b border-solid border-white text-center p-3 text-lg bg-blue-800">{member.AgencyId}</td>
      </tr>
    ))}
  </tbody>
</table>


        
      </div>
    <Footerlabour />

    </>
  );
}

export default TableComponent;

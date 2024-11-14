import { IconButton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from "react";
import Navbar from "../Navbar";
import Footerlabour from "../Footerlabour";
function CreateGroups(){
    return (
      <>
        <Navbar />
        <div className="createGroups-container">
          <input placeholder="Enter Group Name" className="search-box" />
          <IconButton>
            <CheckCircleIcon />
          </IconButton>
        </div>
        <Footerlabour />
      </>
    );
}
export default CreateGroups;
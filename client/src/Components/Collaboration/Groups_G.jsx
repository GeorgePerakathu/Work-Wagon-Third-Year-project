import React from "react";
import logo from "./12.jpg";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navbar";
import Footerlabour from "../Footerlabour";
function Groups_G() {
  return (
    <>
      <Navbar />
      <div className="list-container">
        <div className="ug-header">
          <img src={logo} style={{ height: "2rem", width: "2rem" }} />
          <p className="ug-title">Online Groups</p>
        </div>
        <div className="sb-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search" className="search-box" />
        </div>
        <div className="ug-list">
          <div className="list-team">
            <p className="con-icon">T</p>
            <p className="con-title">Test group</p>
          </div>
          <div className="list-team">
            <p className="con-icon">T</p>
            <p className="con-title">Test group</p>
          </div>
          <div className="list-team">
            <p className="con-icon">T</p>
            <p className="con-title">Test group</p>
          </div>
          <div className="list-team">
            <p className="con-icon">T</p>
            <p className="con-title">Test group</p>
          </div>
        </div>
      </div>
      <Footerlabour />
    </>
  );
}

export default Groups_G;

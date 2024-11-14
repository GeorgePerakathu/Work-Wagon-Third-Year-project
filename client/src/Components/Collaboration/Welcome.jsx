import React from "react";
import logo from "./12.jpg";

function Welcome(){
    return(
      
<div className="welcome-container">
    <img src={logo} alt="Logo" className="welcome-logo"/>
    <p>View and text directly to people present in chat</p>
</div>
    );
}
export default Welcome;
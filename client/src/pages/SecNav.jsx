import React from 'react'
import './FreelanceDash.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function SecNav() {
  return (
    <>
    
        <Navbar/>
        <div className="navBar">
            <div className="navItem">
              <Link to= "/freelance/existed-dispute">
                Customer disputes
              </Link>
              </div>
            <div className="navItem">
              <Link to= "/profile/chat">
                Chat section
              </Link>
              </div>
            <div className="navItem">
            <Link to= "/Signin/form">
              Update profile
              </Link>
            </div>
            <div className="navItem">
            <Link to= "/collab">
              Collaborate
              </Link>
            </div>
        </div>
        </>
  )
}

export default SecNav
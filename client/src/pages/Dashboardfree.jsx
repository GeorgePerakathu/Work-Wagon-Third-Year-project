import React from 'react'
import '../App.css'
import MainDash from '../Components/DashBoard/MainDash/MainDash';
import RightSide from '../Components/DashBoard/RigtSide/RightSide';
import Sidebar from '../Components/DashBoard/Sidebar';
const Dashboard = () => {
  return (
    <div className="App">
    <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div>
  )
}

export default Dashboard
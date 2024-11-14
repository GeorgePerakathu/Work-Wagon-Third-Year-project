import React,{ useState, useEffect } from 'react';
import './FreelanceDash.css'; // Import your CSS file
import dollar from '../assets/dollar.png';
import comment from '../assets/comment.png';
import chart from '../assets/chart.png';
import image1 from '../assets/eye.png';
import SecNav from './SecNav';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Footerlabour from '../Components/Footerlabour';
import customFetch from '../utils/customFetch';

function FreelanceDash() {
  const [jobIds, setJobIds] = useState([]);
  const [checksData, setChecksData] = useState([]);

  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        const response = await customFetch.get('/jobIds');
        if (response && response.data && Array.isArray(response.data.jobIds)) {
          setJobIds(response.data.jobIds.map(job => job.jobId));
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching jobIds:', error);
      }
    };

    fetchJobIds();
  }, []);

  useEffect(() => {
    const fetchChecksData = async () => {
      try {
        const response = await customFetch.get('/checks');
        if (response && response.data && Array.isArray(response.data)) {
          setChecksData(response.data);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching checks data:', error);
      }
    };

    fetchChecksData();
  }, []);

  const filteredChecksData = checksData.filter(check => jobIds.includes(check.jobId));

  return (
    <div className="container">
      {jobIds.map((jobId, index) => (
        <h1 hidden key={index}>jobId: {jobId}</h1>
      ))}

      <div className="main">
        <SecNav />

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1,504</div>
              <div className="cardName">Daily Views</div>
            </div>

            <div className="iconBx">
              <img src={image1} alt="" />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">80</div>
              <div className="cardName">Sales</div>
            </div>

            <div className="iconBx">
              <img src={chart} alt="" />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">284</div>
              <div className="cardName">Comments</div>
            </div>

            <div className="iconBx">
              <img src={comment} alt="" />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">$7,842</div>
              <div className="cardName">Earning</div>
            </div>

            <div className="iconBx">
            <img src={dollar} alt="" />
            </div>
          </div>
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Recent Projects</h2>
              <a href="#" className="btn">View All</a>
            </div>

            <table className='customTable'>
              <thead>
                <tr>
                  <td>Work</td>
                  <td>Payment</td>
                  <td>Tracking ID</td>
                  <td>Status</td>
                </tr>
              </thead>

              <tbody>
              {filteredChecksData.map((check, index) => (
                <tr key={index}>

                <td><Link to={`/displayreq/${check.TrackId}`}>{check.TrackId}</Link></td>
                    <td>{check.budget}</td>
                    <td>{check.jobId}</td>
                    <td><span class="status delivered">Success</span></td>
                </tr>
      ))}
                <tr>
                    <td><Link to="/displayreq">Laptop Bug</Link></td>
                    <td>$110</td>
                    <td>83399245</td>
                    <td><span class="status pending">Pending</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">React Js</Link></td>
                    <td>$1200</td>
                    <td>90033382</td>
                    <td><span class="status return">Return</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">Music Producion</Link></td>
                    <td>$620</td>
                    <td>11377399</td>
                    <td><span class="status inProgress">In Progress</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">Animation</Link></td>
                    <td>$1200</td>
                    <td>13726744</td>
                    <td><span class="status delivered">Delivered</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">Dell Laptop</Link></td>
                    <td>$110</td>
                    <td>188436283</td>
                    <td><span class="status pending">Pending</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">Website backend</Link></td>
                    <td>$1200</td>
                    <td>18422733</td>
                    <td><span class="status return">Return</span></td>
                </tr>

                <tr>
                    <td><Link to="/displayreq">Addidas Shoes</Link></td>
                    <td>$620</td>
                    <td>18372773</td>
                    <td><span class="status inProgress">In Progress</span></td>
                </tr>
   
              </tbody>
   
            </table>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Job Requests</h2>
            </div>

            <table className='table'>
            {filteredChecksData.map((check, index) => (
                <tr key={index}>
 <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>{check.jobId} <br /> <span>Thomas Shelby</span></h4>
                  
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
                </tr>
      ))}
              <tr>
                <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>Web Development <br /> <span>Thomas Shelby</span></h4>
                  
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>React Website <br /> <span>Prashant Patil</span></h4>
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>Dynamic Website <br /> <span>Shaun</span></h4>
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>Backend Development <br /> <span>Bryan Francis</span></h4>
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                </td>
                <td>
                  <h4>Node.js integration <br /> <span>Troy gonzales</span></h4>
                </td>
                <td class="flex justify-end p-4 ml-auto">
                    <button type="button" class="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2">Accept</button>
                    <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">Reject</button>
                  </td>
              </tr>
              

            </table>
          </div>
        </div>
      </div>

      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

      <Footerlabour />
    </div>

  );
}

export default FreelanceDash;

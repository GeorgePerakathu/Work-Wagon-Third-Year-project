import React, { useState, useEffect } from 'react';
import './style.css'; // Import your main CSS file
import './mediaqueries.css'; // Import your media queries CSS file
import ReviewsSection from './reviews';
import PlanCards from './plan';
import img4 from '../assets/linkedin.png';
import img5 from '../assets/github.png';
import img6 from '../assets/experience.png';
import img7 from '../assets/education.png';
import img8 from '../assets/arrow.png';
import img9 from '../assets/checkmark.png';
import img10 from '../assets/project-1.png';
import img11 from '../assets/email.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams,Link } from 'react-router-dom'; // Import useParams hook
import customFetch from '../utils/customFetch';
import Navbar from './Navbar';
import Footerlabour from './Footerlabour';
function Hello() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState({}); // Initialize jobDetails as an object
  const [projectPlans, setProjectPlans] = useState([]);
  const [projects, setprojects] = useState([]);
  const { jobId } = useParams(); // Extract jobId from URL parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(`/allData?jobId=${jobId}`); // Fetch data from backend
        setJobDetails(response.data); // Update jobDetails state with fetched data
        setProjectPlans(response.data.projectPlans);
        setprojects(response.data.projects) ;
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    
    fetchData(); // Call fetchData function when component mounts
  }, [jobId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 // Inside the Hello component

// Update the settings object for the Slider component
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Display 3 slides at a time by default
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600, // Breakpoint for mobile devices
      settings: {
        slidesToShow: 1, // Display 1 slide at a time on mobile screens
      },
    },
  ],
};

// Remaining code remains unchanged


  return (
    <>
    <div>
      <Navbar />
      <section id="profile">
        <div className="section__pic-container">
          <img src={jobDetails.profileImage} className="pfp" alt="John Doe profile " />
        </div>
        <div className="section__text">
          <p className="section__text__p1">Hello, I'm</p>
          <h1 className="title">{jobDetails.firstName} {jobDetails.lastName}</h1>
          <p className="section__text__p2">{jobDetails.jobtype}</p>
          <div className="info-box">
            <h3>Rating: {'★'.repeat(5)}</h3>
            <div className="freedetail">
              <span role="img" aria-label="Location">🌍</span> India
              <span role="img" aria-label="Languages"> 🗣️</span> I speak {jobDetails.languages}
              <span role="img" aria-label="Orders"> 🛍️</span> {jobDetails.orders} orders completed
            </div>
          </div>
          <div className="tag-container">
            {jobDetails.skills && jobDetails.skills.map((skill, index) => (
              <button
                key={index}
                className="tagbtn"
                onClick={() => window.location.href = './#contact'}
              >
                {skill.skill}
              </button>
            ))}
          </div>
          <div className="btn-container">
            <button
              className="btn btn-color-2"
              onClick={() => window.open('../assets/resume-example.pdf')}
            >
              Download CV
            </button>
            <button className="btn btn-color-1" onClick={() => window.location.href = './#contact'}>
              Contact Info
            </button>
          </div>
          <div id="socials-container">
            <img
              src={img4}
              alt="My LinkedIn profile"
              className="icon"
              onClick={() => window.location.href = 'https://linkedin.com/'}
            />
            <img
              src={img5}
              alt="My Github profile"
              className="icon"
              onClick={() => window.location.href = 'https://github.com/'}
            />
          </div>
        </div>
      </section>
      <section id="about">
        <p className="section__text__p1">Get To Know More</p>
        <h1 className="title">About Me</h1>
        <div className="section-container">
  <div className="about-details-container flex">
    <div className="text-container">
     <div className=' text-3xl'> Bio :-</div> 
      <div>{jobDetails.bio}</div>
    </div>
      <div className="about-containers ">
        <div className="details-container mb-7 ">
          <div className='flex justify-center'>
            <img src={img6} alt="Experience icon" className="icon" />
          </div>
          <h3>Experience</h3>
          <p>2+ years</p>
          <p>{jobDetails.experience}</p>
        </div>
        <div className="details-container text-center">
          <div className='flex justify-center'>
            <img src={img7} alt="Education icon" className="icon" />
          </div>
          <h3>Education</h3>
          {jobDetails.education && jobDetails.education.map((edu, index) => (
            <div key={index} className=' mx-auto'>
              <p className='px-2 text-center'>{edu.institution} {edu.yearOfPassing}</p>
            </div>
          ))}
      </div>
    </div>
  </div>
</div>

        <img
          src={img8}
          alt="Arrow icon"
          className="icon arrow"
          onClick={() => window.location.href = './#experience'}
        />
      </section>
      <div id="experience">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Experience</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container-1">
              <h2 className="experience-sub-title">Skills</h2>
              <div className="article-container-1">
                {jobDetails.skills && jobDetails.skills.map((skill, index) => (
                  <article key={index}>
                    <img src={img9} alt="Experience icon" className="icon" />
                    <div>
                      <h3>{skill.skill}</h3>
                      <p>{skill.experience}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img
          src={img8}
          alt="Arrow icon"
          className="icon arrow"
          onClick={() => window.location.href = './#projects'}
        />
      </div>
      <div id="projects">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">Projects</h1>
        <div className="experience-details-container">
          {/* <div className="about-containers"> */}
          
          {projects.length === 1 ? (
  <div className="w-80 p-4 bg-white rounded-lg  transform hover:scale-105 transition-transform duration-300 ease-in-out carousel-item">
    <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src={projects[0].image} />
    <div className="p-4">
      <h2 className="text-xl  font-semibold">{projects[0].title}</h2>
      <p className="text-gray-600">{projects[0].description}</p>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mx-10 focus:ring-blue-400">Live Demo</button>
      </div>
    </div>
  </div>
) : (
  <Slider {...settings}>
    {projects.map((project, index) => (
      <div className="w-80 p-4 bg-white rounded-lg  transform hover:scale-105 transition-transform duration-300 ease-in-out carousel-item" key={index}>
        <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src={project.image} />
        <div className="p-4">
          <h2 className="text-xl  font-semibold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mx-10 focus:ring-blue-400">Live Demo</button>
          </div>
        </div>
      </div>
    ))}
  </Slider>
)}
        </div>
        <img
          src={img8}
          alt="Arrow icon"
          className="icon arrow"
          onClick={() => window.location.href = './#contact'}
          />
        </div>
        {/* plan card section */}
      <div id="plans">
        <h1 className="title">My Plans</h1>
        <PlanCards projectPlans={projectPlans} jobId={jobId} />
      </div>
  <div id="reviews">
    <h1 className="title">Customer Reviews</h1>
    <ReviewsSection />
  </div>
  <br />
  <br />
  <div id="contact" className=''>
    <p className="section__text__p1">Get in Touch</p>
    <h1 className="title">Contact Me</h1>
    <div className="contact-info-upper-container">
      <div className="contact-info-container">
        <img
          src={img11}
          alt="Email icon"
          className="icon contact-icon email-icon"
        />
        <p><a href="mailto:examplemail@gmail.com">Example@gmail.com</a></p>
      </div>
      <div className="contact-info-container">
        <img
          src={img4}
          alt="LinkedIn icon"
          className="icon contact-icon"
        />
        <p><a href="https://www.linkedin.com">LinkedIn</a></p>
      </div>
    </div>
  </div>
</div>

          <Footerlabour />
</>
  );
}

export default Hello;

import React, { useState } from 'react';
import './style.css'; // Import your main CSS file
import './mediaqueries.css'; // Import your media queries CSS file
import img1 from './assets/about-pic.png'
import img2 from './assets/profile-pic.png'
import img3 from './assets/resume-example.pdf'
import img4 from './assets/linkedin.png'
import img5 from './assets/github.png'
import img6 from './assets/experience.png'
import img7 from './assets/education.png'
import img8 from './assets/arrow.png'
import img9 from './assets/checkmark.png'
import img10 from './assets/project-1.png'
import img11 from './assets/email.png'

// rating

export default function Hello() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <section id="profile">
        <div className="section__pic-container">
          <img src={img2} alt="John Doe profile picture" />
        </div>
        <div className="section__text">
          {/* <p className="section__text__p1">Hello, I'm</p> */}
          <h1 className="title">John Doe</h1>
          <p className="section__text__p2">Frontend Developer</p>
          <div className="btn-container">
            <button
              className="btn btn-color-2"
              onClick={() => window.open({img3})}
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
          <div className="section__pic-container">
            <img src={img1} alt="Profile picture" className="about-pic" />
          </div>
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img src={img6} alt="Experience icon" className="icon" />
                <h3>Experience</h3>
                <p>2+ years <br />Frontend Development</p>
              </div>
              <div className="details-container">
                <img src={img7} alt="Education icon" className="icon" />
                <h3>Education</h3>
                <p>B.Sc. Bachelors Degree<br />M.Sc. Masters Degree</p>
              </div>
            </div>
            <div className="text-container">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis
                reprehenderit et laborum, rem, dolore eum quod voluptate
                exercitationem nobis, nihil esse debitis maxime facere minus sint
                delectus velit in eos quo officiis explicabo deleniti dignissimos.
                Eligendi illum libero dolorum cum laboriosam corrupti quidem,
                reiciendis ea magnam? Nulla, impedit fuga!
              </p>
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
      <section id="experience">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Experience</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container">
              <h2 className="experience-sub-title">Hard Skills</h2>
              <div className="article-container">
                <article>
                  <img src={img9} alt="Experience icon" className="icon" />
                  <div>
                    <h3>HTML</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img src={img9} alt="Experience icon" className="icon" />
                  <div>
                    <h3>HTML</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                {/* Add more experience items */}
              </div>
            </div>
            <div className="details-container">
              <h2 className="experience-sub-title">Soft Skills</h2>
              <div className="article-container">
                {/* Add more experience items */}
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
      </section>
      <section id="projects">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">Projects</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container color-container">
              <div className="article-container">
                <img src={img10} alt="Project 1" className="project-img" />
              </div>
              <h2 className="experience-sub-title project-title">Project One</h2>
              <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Live Demo
                </button>
              </div>
            </div>
            <div className="details-container color-container">
              <div className="article-container">
                <img src={img10} alt="Project 1" className="project-img" />
              </div>
              <h2 className="experience-sub-title project-title">Project One</h2>
              <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Live Demo
                </button>
              </div>
            </div>
            <div className="details-container color-container">
              <div className="article-container">
                <img src={img10} alt="Project 1" className="project-img" />
              </div>
              <h2 className="experience-sub-title project-title">Project One</h2>
              <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href = 'https://github.com/'}
                >
                  Live Demo
                </button>
              </div>
            </div>
            {/* Add more project items */}
          </div>
        </div>
        <img
          src={img8}
          alt="Arrow icon"
          className="icon arrow"
          onClick={() => window.location.href = './#contact'}
          />
        </section>
        <section id="contact">
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
        </section>
        <footer>
          <nav>
            <div className="nav-links-container">
              <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </nav>
          <p>Copyright &#169; 2023 John Doe. All Rights Reserved.</p>
        </footer>
        <script src="script.js"></script>
      </div>
    );
  }
  
  
import React from 'react';
import './ContactForm.css'; // Make sure to import your stylesheet
import img1 from '../assets/bg1.png';
const ContactForm = () => {
  return (
    <div className="contact-form">
      <h1>Contact Us</h1>
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Raise Dispute</h2>
            <form action="#" method="post">
              <input type="text" name="name" placeholder="Enter Your  Name" />

              <input type="Number" name="email" placeholder="Enter Your UIN of Employer" />
              <textarea name="message" placeholder="Your Dispute"></textarea>
              <label htmlFor="name">Status :</label>
              <input type="Status" name="email" placeholder="Status of your Dispute" />
              <button type="submit" className="btn">
                Send <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
          <div className="form-img">
            <img src={img1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

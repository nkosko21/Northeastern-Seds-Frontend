import React from "react";
import Navigationbar from "../Components/Navigationbar";
import './Home.css';
import './JoinUs.css';

const linkedIn_logo = require('../Images/linkedIn_logo.png');
const instagram_logo = require('../Images/instagram_logo.avif');

export default function JoinUs() {
  const linkedInIcon = (
    <div
      style={{
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}  
    >
      <a 
        href="https://www.linkedin.com/company/northeastern-seds/"
        target="_blank"
      >
        <img 
          src={linkedIn_logo} 
          alt="LinkedIn" 
          style={{
            borderRadius: '50%',
            height: '20vh',
          }}  
        />
      </a>
      <a 
        href="https://www.linkedin.com/company/northeastern-seds/"
        target="_blank"
        className="link"
      >
        <p className="contact-text">
          Join the SEDS LinkedIn group
        </p>
      </a>
    </div>
  );
  
  const instagramLogo = (
    <div
        style={{
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}  
      >
        <a 
            href="https://www.instagram.com/northeastern.seds/"
            target="_blank"
        >
            <img 
                src={instagram_logo} 
                alt="LinkedIn" 
                style={{
                  borderRadius: '50%',
                  height: '20vh',
                }}  
            />
        </a>
        <a 
            href="https://www.instagram.com/northeastern.seds/"
            target="_blank"
            className="link"
        >
          <p className="contact-text">
              Follow SEDS on Instagram
          </p>
        </a>
    </div>
  );


  return(
  <>
    <Navigationbar highlighted={'joinus'}/>
    <div className="home-container" style={{ height: '100vh' }}>
      <h1 className="about-header">Join Us</h1>
      <br/>
      <div className="social-icons">
        {linkedInIcon}
        {instagramLogo}
      </div>
    </div>
  </>
  );
}

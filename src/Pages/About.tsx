import React from "react";
import Navigationbar from "../Components/Navigationbar";
import './Home.css';

const SEDS_group = require('../Images/SEDS_group.jpeg');
const SEDS_Station = require('../Images/SEDS_Station.jpeg');
const SEDS_Red = require('../Images/SEDS_red.png');
const SEDS_Rover = require('../Images/SEDS_Rover.png');

export default function About() {

  return(
  <>
    <div className="home-container">
      <Navigationbar highlighted={'about'}/>
      <h1 className="about-header">About.</h1>
      <span style={{ display: 'grid', justifyContent: 'center'}}>
        <div className="about-container">
          <img src={SEDS_Rover} className='seds-rover'/>
          <p className="about-text-blocks">
            The Northeastern University chapter of Students for the Exploration and
            Development of Space, or SEDS, is an interdisciplinary student group
            dedicated to space exploration and space exploration technologies.
            SEDS is both a professional and social environment for its hundred-plus
            members, some of whom can usually be found at any hour in the club’s primary
            workspace collaborating on technical projects. SEDS is one of a handful of student group 
            on campus which offers students the opportunity to conduct capstone level 
            research and design before their senior year. 
          </p>
          <p className="about-text-blocks">
            The club also hosts a biannual Space and 
            Technology Expo, plus regular Astronomy Nights with the Physics Department that are open to all. 
            Members can participate at any level, from attending an Astronomy Night all the way up to leading a 
            technical design and prototyping project; based on how they get involved, they can gain skills ranging 
            from a general understanding and appreciation of space up to portfolio pieces, 
            research experience, and technical skills in areas like Python, autonomous navigation, and ROS 2.
          </p>
          <img src={SEDS_Red} className='seds-red' />
          <img src={SEDS_Station} className='seds-station '/>
          <p className="about-text-blocks">
            Since its inception in 2018, the group has conducted a variety of these projects, 
            from creating multiple Mars Rover prototypes to designing and building the COBRA 
            snakebot to prototyping a robot that turns Martian ice into drinkable water. 
            COBRA earned the club first place in NASA’s 2022 BIG Idea Challenge, and the 
            club’s rovers placed first in the 2024 winter Canadian International Rover 
            Challenge and have been finalists for five years running in the University Rover
            Competition. Additionally, SEDS placed 2nd in the 2021 RASC-AL Mars Special Edition: 
            Moon to Mars Ice & Prospecting Challenge.
          </p>
          <p className="about-text-blocks">
            Club members whose rovers reach the final 
            rounds typically travel to participate in competitions, with past cohorts visiting Niagara Falls, 
            Canada, Hanksville, Utah, and Pasadena, California. Students who prefer not to 
            travel get the opportunity to showcase their work at local Boston venues like the 
            Museum of Science and the MassRobotics Block Party. SEDS works extensively in the local 
            community, and does multiple major outreach events each year with Northeastern’s Center 
            for STEM, Roxbury Robotics, the Museum of Science.
          </p>
          <img src={SEDS_group} alt="A group of SEDS Members" className='seds-group'/>
        </div>
      </span>
    </div>
  </>
  );
}

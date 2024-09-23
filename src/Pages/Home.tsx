import React from "react";
import Navigationbar from "../Components/Navigationbar";
import './Home.css';
const projects = [
  {
    logo: null,
    title: 'BIG Idea',
    description: 'The body should definitely be the blue color I sent, with the A text the cream color. Headers and title text should be orange. Any text on an orange background should be blue. The SEDS logo (attached earlier) should be on every page, in a corner or at the bottom of the text on each page.'
  },
  {
    logo: null,
    title: 'SUITS',
    description: 'The body should definitely be the blue color I sent, with the A text the cream color. Headers and title text should be orange. Any text on an orange background should be blue. The SEDS logo (attached earlier) should be on every page, in a corner or at the bottom of the text on each page.',
  }
];

interface ProjectTileProps {
  logo: any;
  title: string;
  description: string;
}

function ProjectTile({ logo, title, description }: ProjectTileProps) {
  return (
    <div className="project-container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          width: '50%',
        }}
      >
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function Home() {
  
  return(
  <div className="home-container">
    <Navigationbar highlighted={'home'}/>
    <br />
    <h1 className="about-header">Projects.</h1>
    <br />
    <span 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }>
      {projects.map(project => 
        <ProjectTile logo={null} title={project.title} description={project.description} />
      )}
    </span>
  </div>
  );
}

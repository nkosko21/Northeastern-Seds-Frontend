import React from 'react';
import pages from '../Data/pages';
import './Navigationbar.css';
const SEDS_Logo = require('../Images/SEDS_Logo.png');

const Navigation = ({highlighted} : {highlighted: string}) => {
  return (
    <>
      <div className="nav-container">
      <img src={SEDS_Logo} alt="SEDS Logo" className='seds-logo'/>
        {pages.map((page) => (
          <PageLink
            key={page.link}
            text={page.text}
            link={page.link}
            highlighted={page.link === highlighted}
          />
        ))}
      </div>
      <div style={{ width: '100vw', height: '5px', backgroundColor: '#2000FF'}}></div>
      <div style={{ width: '100vw', height: '5px', backgroundColor: '#FBD309'}}></div>
      <div style={{ width: '100vw', height: '5px', backgroundColor: '#2000FF'}}></div>
    </>
  );
};

interface PageLinkProps {
  text: string;
  link: string;
  highlighted: boolean;
}

const PageLink: React.FC<PageLinkProps> = ({ text, link, highlighted }) => (
  <a href={`/${link}`} className={`pageLink${highlighted ? '-highlighted' : ''}`}>
    <div>
      {text}
    </div>
  </a>
);

export default Navigation;

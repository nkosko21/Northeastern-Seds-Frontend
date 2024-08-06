import React from "react";
import Navigationbar from "../Components/Navigationbar";
import './Events.css';
import { outreach } from "../Data/Outreach";

export default function Events() {

  return(
  <>
    <Navigationbar highlighted={'events'}/>
    <div className="event-container">
      <article>
        {outreach.map(example => <OutreachExample text={example} />)}
      </article>
      <aside>
        <h2 style={{ color: '#de8149' }}>Outreach</h2>
        <p className="outreach-desc">
          SEDS is committed to educating other Northeastern students on campus about professional 
          and engineering skills and reaching the Boston area to promote the role 
          Northeastern University has in STEM fields. The events described below cover the outreach we have done in the past few years:
        </p>
      </aside>
    </div>
  </>
  );
}

const OutreachExample = ({text} : {text: string}) => (
  <div className="outreachExample">
    <p>{text}</p>
  </div>
);
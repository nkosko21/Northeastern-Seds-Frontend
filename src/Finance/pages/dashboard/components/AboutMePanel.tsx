import {User} from '../../../finance/datatypes'
import './MyItemsPanel.css'

const AboutMePanel = ({user} : {user: User}) => {
    const AboutLogo = require('../../../../Images/curiosity.jpg');

    return (
        <div className="panel">
                <h1>About Me</h1>
                <img src={AboutLogo} className="panelLogo"></img>
                <h1>{user.name}</h1>
                <h3>Permissions:</h3><p>{user.permissions.map((key, index)=>(<span key={index}>{key}<br /></span>))}</p>
                <h3>Default Project / Subteam:</h3><p>{user.project} / {user.subteam}</p>
                <h3>Info:</h3>
                <p>{user.address.street}<br />
                    {user.address.city}, {user.address.state}, {user.address.zipCode}<br />
                    {user.phoneNumber}</p>
            </div>
    );
}

export default AboutMePanel;
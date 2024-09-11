import React, { useState } from 'react';
import './TopBar.css'; // Import the CSS file

const TopBar = ({ onSignIn, username }) => {
    const [text, setText] = useState('')
    const logo = require('../../Images/sedslogo.png');
    const user = require('../../Images/usericon.png');

    const handleClick = () => {
        onSignIn(text)
    }
    return (
        <div className="top-bar">
            <img className="logo" src={logo} alt="logo"></img>
            <div className="nav-links">
                <img src={user}></img>
                <p>{username}</p>
                <div></div>
                <p className="nuId">NuID:</p>
                <input className="IdInput" value={text} type="tel" onChange={(event) => setText(event.target.value)} maxLength={9}></input>
                <button onClick={handleClick}>Sign In</button>
            </div>
        </div>
    );
};

export default TopBar;

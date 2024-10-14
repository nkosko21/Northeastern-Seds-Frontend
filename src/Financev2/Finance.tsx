import React, { useRef, useState } from "react";
import Navbar from './Navbar';
import './Finance.css';
import { onSignIn } from './backend/finance_interface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";

export default function Finance() {
    const Takeoff = require('../Images/takeoff.jpg');
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [currPanel, setCurrPanel] = useState<Number>(0);

    return (
        <>
            < head >
                <link href="https://fonts.googleapis.com/css2?family=Scheherazade&display=swap" rel="stylesheet" />
            </head >
            <Navbar username={username} signIn={(text: string) => onSignIn(text).then((signedIn: string) => { setIsSignedIn(signedIn !== ''); setUsername(signedIn); console.log(signedIn); })} />
            <ToastContainer className='announcements' position='top-right' autoClose={1000} pauseOnHover={false} hideProgressBar={true} />
            {(!isSignedIn) ? (
                <div className="splash">
                    <div className="description">
                        <h1>SEDS<br />Finance System</h1>
                        <p>Sign in with your NU Id to see your SEDS dashboard</p>
                    </div>
                    <img src={Takeoff} />
                </div>
            ) : <div>
                <div className="minibar">
                    <h4 className={currPanel === 0 ? 'underlined' : ''} onClick={() => { setCurrPanel(0); }}>Dashboard</h4>
                    <h4 className={currPanel === 1 ? 'underlined' : ''} onClick={() => { setCurrPanel(1); }}>Action Items</h4>
                    <h4 className={currPanel === 2 ? 'underlined' : ''} onClick={() => { setCurrPanel(2); }}>Requests</h4>
                    <h4 className={currPanel === 3 ? 'underlined' : ''} onClick={() => { setCurrPanel(3); }}>Spending</h4>
                </div>
                {(currPanel === 0) ? (
                    <Dashboard />
                ) : (<Dashboard />
                )}
            </div>}
        </>
    );
}

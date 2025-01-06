import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import './Navbar.css';
import { toast } from 'react-toastify';

const SEDS_Logo = require('../Images/sedslogo.png');

const Navbar = ({ id="", username = "", signIn = () => { } }: { id?: string, username: string, signIn?: (nuID: string, password:string) => void }) => {
    const [NUId, setNUId] = useState<string>(id);
    const [password, setPassword] = useState<string>('');

    const handleKeyPress = (event: ChangeEvent<HTMLInputElement>, isNUId:boolean = true) => {
        if(isNUId){
            const currChar: string = event.target.value.charAt(event.target.value.length - 1);
            if (!isNaN(parseInt(currChar, 10)) || currChar === '') {
                setNUId(event.target.value);
            }
        }else{
            setPassword(event.target.value);
        }    
    };

    return (
        <>
            <div className="bar">
                <div className='leftContent'>
                    <img className="logo" src={SEDS_Logo} ></img>
                </div>
                <div className="rightContent">
                    {username === "" ? (
                        <div className = "inputs">
                            <input type="tel" inputMode='numeric' value={NUId} onChange={(e) => { handleKeyPress(e) }} placeholder="Enter your NUId" maxLength={9} />
                            <input type = "password" value={password} onChange={(e) => { handleKeyPress(e, false) }} placeholder="Enter your password"/>
                        </div>                        
                    ) : (
                        <h1>Welcome, {username.split(' ')[0]}!</h1>
                    )}
                    <button onClick={() => { if (NUId.length === 9) { signIn(NUId, password); } else { toast.error('Invalid NUId'); } }}>{(username === "") ? "Sign In" : "Sign Out"} </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;

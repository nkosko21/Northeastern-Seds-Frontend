import React, { useRef, useState } from "react";
import Navbar from './Navbar';
import './Finance.css';
import { signIn, getBudgetItems, getActionItems } from './finance/finance_interface';
import {User, createBlankUser, BudgetItem, createBlankBudgetItem} from './finance/datatypes';
import { ToastContainer, toast } from 'react-toastify';
import {PopupManager} from './popups/PopupManager'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/dashboard/Dashboard";
import { useCookies } from "react-cookie";

export default function Finance() {
    const Takeoff = require('../Images/takeoff.jpg');
    const [user, setUser] = useState<User>(createBlankUser());
    const [currPanel, setCurrPanel] = useState<Number>(0);
    const [budgetItems, setBudgetItems] = useState<{[key: number]: BudgetItem}>({});
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const update = () => {
        getBudgetItems().then(
            (currBudgetItems) => {setBudgetItems(currBudgetItems); getActionItems(currBudgetItems, user)})
    }

    return (
        <>
            <PopupManager user={user} update={update}></PopupManager>
            <Navbar id={cookies.user} username={user.name} signIn={(text: string) => signIn(text).then(
                (currUser: User) => { setUser(currUser);  setCookie('user', currUser.id); update();})} />
            <ToastContainer className='announcements' position='top-right' autoClose={1000} pauseOnHover={false} hideProgressBar={true} />
            {((user.id == "")) ? (
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
                    <h4 className={currPanel === 1 ? 'underlined' : ''} onClick={() => { setCurrPanel(1); }}>My Budget Items</h4>
                    <h4 className={currPanel === 2 ? 'underlined' : ''} onClick={() => { setCurrPanel(2); }}>Budget Items</h4>
                    <h4 className={currPanel === 3 ? 'underlined' : ''} onClick={() => { setCurrPanel(3); }}>Spending</h4>
                </div>
                {(currPanel === 0) ? (
                    <Dashboard user={user} budgetItems={budgetItems}/>
                ) : (<Dashboard user={user} budgetItems={budgetItems}/>
                )}
            </div>}
        </>
    );
}

import React, { createContext, useContext, useState } from "react";
import { User } from "./datatypes";

const PopupContext = createContext<PopupContextType>({popup: '', setPopup: () => {}});


//This is the manager for the entire backend. I am replacing it because I hate myself.
export const FinanceManager = ({user, update}:{user:User,update:() => void}) => {
    const [popup, setPopup] = useState<string>('');
    setGlobalPopupFn((popup:string) => {setPopup(popup)});
    return (
    <div>
        <PopupContext.Provider value={{popup, setPopup}}>
            {popup === 'new' ?
            <NewSubmission user={user} update={update}/>:
            <></>}
        </PopupContext.Provider>
    </div>)
}


export const setPopup = (popup:string) => {
    if (setGlobalPopup) {
        setGlobalPopup(popup);
    } else {
        console.warn('setGlobalPopup is not initialized yet');
    }
};


// Create a global setter function
let setGlobalPopup:((popup:string) => void);

const setGlobalPopupFn = (fn:(popup:string) => void) => {
    setGlobalPopup = fn;
};


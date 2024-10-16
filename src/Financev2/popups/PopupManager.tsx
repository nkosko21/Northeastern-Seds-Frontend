import React, { createContext, useContext, useState } from "react";
import { User } from "../backend/datatypes";
import NewSubmission from "./NewSubmission";

interface PopupContextType{
    popup: string;
    setPopup: (newPopup: string) => void;
}
const PopupContext = createContext<PopupContextType>({popup: '', setPopup: () => {}});

export const PopupManager = ({user}:{user:User}) => {
    const [popup, setPopup] = useState<string>('');
    setGlobalPopupFn((popup:string) => {setPopup(popup)});
    return (
    <div>
        <PopupContext.Provider value={{popup, setPopup}}>
            {popup === 'new' ?
            <NewSubmission user={user}/>:
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


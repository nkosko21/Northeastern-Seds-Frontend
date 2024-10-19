import React, { createContext, useContext, useState } from "react";
import { User, BudgetItem } from "../finance/datatypes";
import NewSubmission from "./NewSubmission";
import ReviewSubmission from "./ReviewSubmission";
import RecieptSubmission from "./RecieptSubmission";
import './PopupManager.css'

interface PopupContextType{
    popup: string;
    setPopup: (newPopup: string) => void;
}
const PopupContext = createContext<PopupContextType>({popup: '', setPopup: () => {}});

//This is the popup manager that handles the display of everything
export const PopupManager = ({user, items, update, updateActionItems}:{user:User, items:{[key: number]: BudgetItem}, update:() => void, updateActionItems:() => void}) => {
    //The current popup being displayed
    const [popup, setPopup] = useState<string>('');

    //The function tht sets the global popup
    setGlobalPopupFn((popup:string) => {setPopup(popup)});

    //The react component. This will handle the popups.
    return (
    <PopupContext.Provider value={{popup, setPopup}}>
        {/**This is the default popup that exists when the popup is null*/}
        {popup === '' ? (null) : (
            <div className="background" >
                <div className="popupMain">
                    {popup === 'new' ? (
                        <NewSubmission user={user} update={update} />
                    ) : popup.includes('review') ? (
                        <ReviewSubmission user={user} item={items[Number(popup.split(' ')[1])]} id={Number(popup.split(' ')[1])} updateActionItems={updateActionItems} update={update}/>
                    ) :  popup.includes('reciept') ? (
                        <RecieptSubmission user={user} item={items[Number(popup.split(' ')[1])]} id={Number(popup.split(' ')[1])} updateActionItems={updateActionItems} update={update}/>
                    ): null}
                </div>
            </div>
        )}
        
    </PopupContext.Provider>
    )
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


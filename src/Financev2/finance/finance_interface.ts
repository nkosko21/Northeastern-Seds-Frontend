import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';
import {teams} from './project_data';
import {setPopup} from '../popups/PopupManager';
import * as datatypes from './datatypes';

const url = `https://api.northeasternseds.com/`; // Base URL for the API


// Function to handle sign-in action
export const signIn = (id: string): Promise<datatypes.User> => {
    //This is the loading icon 
    const loading = toast.loading('Signing in...');
    // Make a GET request to authenticate the user
    return new Promise<datatypes.User>((resolve) => {
        axios.get(url + `auth/${id}`).then(response => {
            if (Object.keys(response.data).length === 0) {
                toast.update(loading, {
                    render: "User Not Found",
                    type: "error",
                    autoClose: 1000,
                    isLoading: false,
                });
                resolve(datatypes.createBlankUser());

            } else {
                toast.update(loading, {
                    render: "Sign In Successful",
                    type: "success",
                    autoClose: 1000,
                    isLoading: false,
                });
                resolve({
                    id: response.data["NUId"],
                    name: response.data["Name"],
                    email: response.data["Email"],
                    project: response.data["Project"],
                    subteam: response.data["Subteam"].split(" ")[1],
                    permissions: response.data["Permissions"].split("/"),
                    address: {street: response.data["Street/PO Box"], city: response.data["City"],
                        state: response.data["State"], zipCode: response.data["Zip Code"]},
                    phoneNumber: response.data["Phone Number"], // Assuming 0 is a placeholder
                });
            }
        }).catch(error => {
            toast.update(loading, {
                render: error.message,
                type: "error",
                autoClose: 1000,
                isLoading: false,
            });
            console.error('Error fetching auth data:', error); // Handle errors
            resolve(datatypes.createBlankUser());
        });
    });
};

//This is a function that gets all of the requests
export const getBudgetItems = (): Promise<{[key: number]: datatypes.BudgetItem}> => {
    const loading = toast.loading('Getting Budget Items...');
    return new Promise<{[key: number]: datatypes.BudgetItem}>((resolve) => {
        // Make another GET request to fetch the request list after authentication
        axios.get(url + 'req_list')
        .then(response => {
            toast.update(loading, {
                render: "Budget Items Retrieved",
                type: "success",
                autoClose: 1000,
                isLoading: false,
            });
            console.log(parseBudgetItems(response.data));
            resolve(parseBudgetItems(response.data));
        })
        .catch(error => {
            console.log(error);
            toast.update(loading, {
                render: error.message,
                type: "error",
                autoClose: 1000,
                isLoading: false,
            });
            resolve([]);
        });
    })
}

export const getActionItems = (budgetItems: {[key: number]: datatypes.BudgetItem}, user: datatypes.User): {[id: number]: number} => {
    console.log('getting action items...')
    var actionItems:{[id: number]: number} = {};
    Object.entries(budgetItems).map(([key, budgetItem]) => {
        const id = Number(key);         //Idk why it is so insistent that key is a string
        //Check whether we have one of our submissions that needs to be submitted
        if(budgetItems[id].status === 'Approved' && budgetItem.request.requestee == user.name){
            console.log('test');
            const warnId = toast.warn('Submit Reciept for ' + budgetItem.request.description, {
                autoClose: false, closeButton: false, onClick: () => {
                    setPopup('hi')}});
            actionItems[id] = Number(warnId);
        }
        //Check if we need to approve something
        else if(budgetItems[id].status === 'Pending Approval' && 'Business' in user.permissions){
            const warnId = toast.warn('Review ' + budgetItem.request.description, {
                autoClose: false, closeButton: false, onClick: () => {
                    setPopup('hi')}});
            actionItems[id] = Number(warnId);
        }
        //Check if we need to approve something as admin
        else if(budgetItems[id].status === 'Pending Admin Approval' && ("Admin (" + budgetItems[id].request.subteam + ")") in user.permissions){
            const warnId = toast.warn('Review' + budgetItem.request.description + ' as Admin', {
                autoClose: false, closeButton: false, onClick: () => {
                    setPopup('hi')}});
            actionItems[id] = Number(warnId);
        }
    })
    return actionItems;
}

export const getUserItems = (budgetItems: {[key: number]: datatypes.BudgetItem}, user: datatypes.User) : {[key: number]: datatypes.BudgetItem} => {
    const userItems:{[key: number]: datatypes.BudgetItem}  = {}
    for( const item in budgetItems ){
        if( budgetItems[item].request.requestee === user.name ){
            userItems[item] = budgetItems[item]
        }
    }
    return userItems;
}

export const getOptions = ():Promise<datatypes.SubmissionOptions> => {
    const loading = toast.loading('Getting Request Options...');
    return new Promise<datatypes.SubmissionOptions>( (resolve) => {
        axios.get(url + 'options')
        .then(response => {
          console.log(response.data);
          toast.update(loading, {
              render: "Request Options Retrieved",
              type: "success",
              autoClose: 1000,
              isLoading: false,
          });
          resolve( {adminThreashold: response.data['Admin Threshold'], budgetOptions: response.data['Budget Account Options'], projectOptions: response.data['Project Options'], subteamOptions: response.data['Subteam Options']})
        })
        .catch(error => {
          console.error('Error fetching options:', error);
          toast.update(loading, {
              render: error.message,
              type: "error",
              autoClose: 1000,
              isLoading: false,
          });
        });
    });
};

export const submitRequest = (request:{[key: string]:string}) => {
    const loading = toast.loading('Submitting Request...');
    axios.post(url + 'submit/request', request).then(() => {
        toast.update(loading, {
            render: "Request Submitted",
            type: "success",
            autoClose: 1000,
            isLoading: false,
        });
    })
        .catch(error => {
        console.error('Error posting request:', error);
        toast.update(loading, {
            render: error.message,
            type: "error",
            autoClose: 1000,
            isLoading: false,
        });
        });
}

const parseBudgetItems = (data:{[key: number]: {[key:string]:string}}) : {[key: number]: datatypes.BudgetItem} => {
    var budgetItems:{[key: number]: datatypes.BudgetItem} = []
    Object.entries(data).forEach(([key, currElement]) => {
        budgetItems[Number(key)] = ({
            request: {requestee: currElement['Requestee'], date: currElement['Request Date'], cost: Number(currElement['Requested Cost']),
                project: currElement['Project'], subteam: currElement['Subteam'], description: currElement['Description'], link: currElement['Link'],
                index: currElement['Budget Index'], account: currElement['Accont']},
            status: currElement['Status'],
            approval: {date: currElement['Approval Date'], approver: currElement['Approver']},
            adminApproval: {date: currElement['Admin Date'], approver: currElement['Admin Approver']},
            submission: {cost: Number(currElement['Final Cost']), tax: Number(currElement['Tax']), reciept: currElement['Reciept'], date: currElement['Submission Date']},
            verification: currElement['SABO Reciept'],
            advisorDate: currElement['Advisor Approval Date'],
            notes: currElement['Notes']
            })
    })
    return budgetItems;
}




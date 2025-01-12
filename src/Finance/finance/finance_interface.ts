import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';
import {teams} from './project_data';
import {setPopup} from '../popups/PopupManager';
import * as datatypes from './datatypes';

const url = `https://api.northeasternseds.com/`; // Base URL for the API
var token = ''

// Function to handle sign-in action
export const signIn = (nuID: string, password:string ): Promise<datatypes.AuthResponse> => {
    //This is the loading icon 
    const loading = toast.loading('Signing in...');
    // Make a GET request to authenticate the user
    return new Promise<datatypes.AuthResponse>((resolve) => {
        axios.get(url + `auth?nuid=${nuID}&password=${password}`).then(response => {
            if (Object.keys(response.data).length === 0) {
                toast.update(loading, {
                    render: "User Not Found",
                    type: "error",
                    autoClose: 1000,
                    isLoading: false,
                });
                resolve({
                    token: '',
                    actions: {}
                });

            } else {
                toast.update(loading, {
                    render: "Sign In Successful",
                    type: "success",
                    autoClose: 1000,
                    isLoading: false,
                });
                token = response.data['token']
                resolve({
                    token: response.data['token'],
                    actions: response.data['actions']
                    
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
            resolve({
                token: '',
                actions: {}
            });
        });
    });
};

export const getUser = ():Promise<datatypes.User> => {
    const loading = toast.loading('Getting User Info...');
    return new Promise<datatypes.User>((resolve) => {
        // Make another GET request to fetch the request list after authentication
        axios.get(url + `user?token=${token}`)
        .then(response => {
            console.log("Test")
            console.log(response)
            toast.update(loading, {
                render: "Budget Items Retrieved",
                type: "success",
                autoClose: 1000,
                isLoading: false,
            });
            resolve({
                id: response.data["nuid"],
                name: response.data["name"],
                email: response.data["email"],
                project: response.data["project_name"],
                subteam: response.data["subteam_name"].split(" ")[1],
                permissions: response.data["permissions"].split("/").map((permission: string) => permission.trim()),
                address: {street: response.data["street/po_box"], city: response.data["city"],
                state: response.data["state"], zipCode: response.data["zip_code"]},
                phoneNumber: response.data["phone_number"], // Assuming 0 is a placeholder);
            })
        })
        .catch(error => {
            console.log(error);
            toast.update(loading, {
                render: error.message,
                type: "error",
                isLoading: false,
            });
            resolve(datatypes.createBlankUser());
        });
    })
}

//This is a function that gets all of the requests
export const getBudgetItems = (): Promise<{[key: number]: datatypes.BudgetItem}> => {
    const loading = toast.loading('Getting Budget Items...');
    return new Promise<{[key: number]: datatypes.BudgetItem}>((resolve) => {
        // Make another GET request to fetch the request list after authentication
        axios.get(url + `requests?token=${token}`)
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
    console.log(budgetItems)
    Object.entries(budgetItems).map(([key, budgetItem]) => {
        const id = Number(key);         //Idk why it is so insistent that key is a string
        //Check whether we have one of our submissions that needs to be submitted
        if(budgetItems[id].status === 'Approved' && budgetItem.request.requestee == user.name){
            const warnId = toast.warn('Submit Reciept for ' + budgetItem.request.description, {
                autoClose: false, closeButton: false, onClick: () => {
                    toast.dismiss(); setPopup('reciept ' + id)}});
            actionItems[id] = Number(warnId);
        }
        //Check if we need to approve something
        else if(budgetItems[id].status === 'Pending Approval' &&  (user.permissions.includes("Finance") || user.permissions.includes(`(${budgetItems[id].request.project}) ${budgetItems[id].request.subteam} Lead`))){
            console.log('here!');
            const warnId = toast.warn('Review ' + budgetItem.request.description, {
                autoClose: false, closeButton: false, onClick: () => {
                    toast.dismiss(); setPopup('review ' + id)}});
            actionItems[id] = Number(warnId);
        }
        //Check if we need to approve something as admin
        else if(budgetItems[id].status === 'Pending Admin Approval' && user.permissions.includes(budgetItems[id].request.project + " Admin") ){
            const warnId = toast.warn('Review' + budgetItem.request.description + ' as Admin', {
                autoClose: false, closeButton: false, onClick: () => {
                    toast.dismiss(); setPopup('admin_review ' + id)}});
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
          resolve( {adminThreashold: response.data['admin_threshold'], budgetOptions: response.data['budget_account_options'], projectOptions: response.data['project_options'], subteamOptions: response.data['subteam_options']})
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
export const submitRequest = (request:{[key: string]:string}):Promise<void> => {
    const loading = toast.loading('Submitting Request...');
    return new Promise<void>((resolve)=>{
        axios.post(url + `request?token=${token}`, request).then(() => {
            toast.update(loading, {
                render: "Request Submitted",
                type: "success",
                autoClose: 1000,
                isLoading: false,
            });
            resolve()
        })
            .catch(error => {
            console.error('Error posting request:', error);
            toast.update(loading, {
                render: error.message,
                type: "error",
                autoClose: 1000,
                isLoading: false,
            });
            resolve()
            });
    })
}


export const postApproval = (rqid:number, approval:{[key: string]:string}):Promise<void> => {
    const loading = toast.loading('Submitting Approval...');
    return new Promise<void>( (resolve) => {
        axios.post(url + `requests/${rqid}/approval?token=${token}`, approval).then( () =>
            toast.update(loading, {
                render: "Approval Submitted",
                type: "success",
                autoClose: 1000,
                isLoading: false,
            })
        ).then( () => {        resolve();
        })
        .catch(error => {
          console.error('Error posting approval:', error);
        });
    })
    
  };

export  const postFiles = (cost:number, tax:number, id:number, nuID: string, files:File[]):Promise<void> => {
    const loading = toast.loading('Submitting Files...');
    if (files.length === 0) { return new Promise<void>(()=>{}); }
    return new Promise<void>((resolve) => {
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append(`file_uploads`, file);
          formData.append('data', JSON.stringify({'rqid': id, 'final_cost': cost, 'tax': tax}))
        });
        axios.post(url + `request/${id}/upload?token=${token}`, formData)
          .then(() => {
            toast.update(loading, {
                render: "Files Submitted",
                type: "success",
                autoClose: 1000,
                isLoading: false,
            })
            resolve();
            // axios.post(url + 'submit/final', { 'Cost': cost, 'Tax': tax, 'ID': id, 'NUId': nuID})
            //   .then(() => {
                
            //   })
            //   .catch((err) => {
            //     toast.update(loading, {
            //         render: err.message,
            //         type: "error",
            //         autoClose: 1000,
            //         isLoading: false,
            //     })
            //     console.error('Error submitting final request:', err);
            //   });
          })
          .catch((err) => {
            console.error('Error uploading files:', err);
          });
    })
    
  };

const parseBudgetItems = (data:{[key: number]: {[key:string]:string}}) : {[key: number]: datatypes.BudgetItem} => {
    var budgetItems:{[key: number]: datatypes.BudgetItem} = []
    Object.entries(data).forEach(([key, currElement]) => {
        if( currElement['status'] !== 'Cancelled' ){
            budgetItems[Number(key)] = ({
            request: {requestee: currElement['requestee'], date: currElement['request_date'], cost: Number(currElement['request_cost']),
                project: currElement['project_name'], subteam: currElement['subteam_name'], description: currElement['description'], link: currElement['link'],
                index: currElement['budget_index'], account: currElement['account_code']},
            status: currElement['status'],
            approval: {date: currElement['approval_date'], approver: currElement['approver']},
            adminApproval: {date: currElement['admin_approval_date'], approver: currElement['admin_approver']},
            submission: {cost: Number(currElement['final_cost']), tax: Number(currElement['tax']), reciept: currElement['reciept'], date: currElement['submission_date']},
            verification: currElement['sabo_link'],
            advisorDate: currElement['advisor_approval_date'],
            notes: currElement['notes']
            })
        }
    })
    return budgetItems;
}




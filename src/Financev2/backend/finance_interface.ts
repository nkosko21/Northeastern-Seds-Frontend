import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';

const url = `https://api.northeasternseds.com/`; // Base URL for the API

//This is a generic user class that interfaces with the backend
export const onSignIn = (text: string): Promise<string> => { // Function to handle sign-in action
    const id = toast.loading('Signing in...');
    // Make a GET request to authenticate the user
    return new Promise<string>((resolve) => {
        axios.get(url + `auth/${text}`).then(response => {
            console.log(response.data)
            if (Object.keys(response.data).length === 0) {
                toast.update(id, {
                    render: "User Not Found",
                    type: "error",
                    autoClose: 1000,
                    isLoading: false,
                });
                resolve("");

            } else {
                toast.update(id, {
                    render: "Sign In Successful",
                    type: "success",
                    autoClose: 1000,
                    isLoading: false,
                });
                resolve(response.data['Name']);
            }
        }).catch(error => {
            console.error('Error fetching auth data:', error); // Handle errors
            resolve('');
        });
    });
};



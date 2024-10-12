import './Finance.css';
import TopBar from './components/TopBar'; // Import the TopBar component
import SplashPage from './components/SplashPage'; // Import the SplashPage component
import MainPage from './components/MainPage'; // Import the MainPage component
import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState } from 'react'; // Import React and useState hook

function Finance() {
  // State to store the username of the signed-in user
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});
  const [req_list, setReqList] = useState({});
  const [options, setOptions] = useState({});
  console.log('using https')
  const url = `http://api.northeasternseds.com/`; // Base URL for the API

  // Function to handle sign-in action
  const onSignIn = (text) => {
    console.log('signing in...');
    // Make a GET request to authenticate the user
    axios.get(url + `auth/${text}`)
      .then(response => {
        // Assuming the API response contains a 'Name' field
        console.log(response.data);
        setUsername(response.data.Name || ''); // Update the username state
        setUser(response.data || {}); // Update the user state
        // Make another GET request to fetch the request list after authentication
        axios.get(url + 'req_list')
          .then(response => {
            getOptions();
            setReqList(response.data); // Update the req_list state with the fetched data
          })
          .catch(error => {
            console.error('Error fetching req_list:', error); // Handle errors
          });
      })
      .catch(error => {
        console.error('Error fetching auth data:', error); // Handle errors
      });
  };

  const postRequest = (request) => {
    axios.post(url + 'submit/request', request)
      .catch(error => {
        console.error('Error posting request:', error);
      });
  };

  const postApproval = (approval) => {
    axios.post(url + 'approve', approval)
      .catch(error => {
        console.error('Error posting approval:', error);
      });
  };

  const postFiles = (cost, tax, request, id, files) => {
    if (files.length === 0) { return; }
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append(`file_uploads`, file);
    });
    axios.post(url + 'upload/' + id, formData)
      .then(() => {
        axios.post(url + 'submit/final', { 'Cost': cost, 'Tax': tax, 'Request': request, 'ID': id })
          .then(() => {
            alert('Files uploaded successfully');
          })
          .catch((err) => {
            console.error('Error submitting final request:', err);
          });
      })
      .catch((err) => {
        console.error('Error uploading files:', err);
      });
  };

  const getOptions = () => {
    axios.get(url + 'options')
      .then(response => {
        console.log(response.data);
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  };

  return (
    <div className="main">
      {/* TopBar component with the onSignIn function passed as a prop */}
      <TopBar onSignIn={onSignIn} username={username} />
      <header className="body">
        {/* Conditionally render SplashPage or MainPage based on whether the username is set */}
        {username === '' ? <SplashPage /> : <MainPage req_list={req_list} user={user} options={options}
          postRequest={postRequest} postApproval={postApproval} postFiles={postFiles} />}
      </header>
    </div>
  );
}

export default Finance;

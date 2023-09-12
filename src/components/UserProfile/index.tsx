import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function UserProfile() {
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
          console.error('User is not authenticated');
          return;
        }

        console.log('Attempting to fetch user data...');
        const response = await axios.get('https://empireone-global-inc.uc.r.appspot.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('Response received:', response); // Log the entire response object

        if (response.status === 200) {
          console.log('User Data:', response.data);
          setUserData(response.data); // Use setUserData to update userData
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error, e.g., display an error message to the user
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      {/* Display other user profile fields here */}
    </div>
  );
}

export default UserProfile;

import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import Loader from '../ui/Loader';

const Logout: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        setLoading(true);

        // Send a logout request to the backend
        await axios.post(
          'http://localhost:8080/api/logout',
          {},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Remove the access token from local storage
       

        // Update the authentication state to false
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');

        // Redirect to the sign-in page
        history.push('/sign-in');
        console.log('Logout successful');
      } else {
        console.error('Access token not found.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  }, [history]);

  return (
    <div className="logout-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <div>
              <FaSignOutAlt className="logout-icon" onClick={handleLogout} /> Logout
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Logout;

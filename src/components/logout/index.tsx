import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {
  const history = useHistory();

  // Memoize the handleLogout function
  const handleLogout = useCallback(() => {
    // Assuming you are storing the authentication token in localStorage
    localStorage.removeItem('accessToken');
    // Redirect to the login page or any other desired route
    history.push('/login');
  }, [history]);

  useEffect(() => {
    handleLogout(); // Call the memoized function
  }, [handleLogout]); // Include handleLogout in the dependency array

  return (
    <div>
      <p>Logging out...</p>
      {/* You can add a loading spinner or message here */}
    </div>
  );
};

export default Logout;

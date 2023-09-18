import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Check if the user is already authenticated (e.g., from a cookie)
  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      // You may want to validate the token with your server here
      setAuthToken(storedToken);
    }
  }, []);

  const login = (token) => {
    // Set the authToken in state
    setAuthToken(token);

    // Store the authentication token in a secure cookie
    Cookies.set('authToken', token, { secure: true, sameSite: 'strict' });
  };

  const logout = () => {
    // Clear the authToken from state
    setAuthToken(null);

    // Clear the authentication token from the cookie
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

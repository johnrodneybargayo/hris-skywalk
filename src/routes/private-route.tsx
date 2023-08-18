import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../components/Utils/cookieUtils'; // Import the cookie function

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authToken = getCookie('authToken'); // Get the authentication token from cookie
  const isAuthenticated = !!authToken;

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />; // Redirect to login page if not authenticated
        }
      }}
    />
  );
};

export default PrivateRoute;

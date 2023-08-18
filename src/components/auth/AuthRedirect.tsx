import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

interface WithAuthRedirectProps extends RouteProps {
  isAuthenticated: boolean;
}

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  isAuthenticated: boolean
): React.FC<P & WithAuthRedirectProps> => {
  return (props: P & WithAuthRedirectProps) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;

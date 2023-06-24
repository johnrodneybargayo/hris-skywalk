import React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

type PublicRouteProps = {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
} & RouteProps;

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>) => (
        <>
          <Component {...props} />
        </>
      )}
    />
  );
};

export default PublicRoute;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PublicRoute from './public-route';
import { Page404Error } from '../pages/404Error/index';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';

const Routes: React.FC = () => {
  const isPublicSystem = process.env.SYSTEM_TYPE === 'public';

  return (
    <Switch>
      <PublicRoute exact path="/sign-in" component={LoginPage} />
      <PublicRoute exact path="/sign-up" component={SignUpPage} />

      <PublicRoute path="/error404" component={Page404Error} />

      {/* Add a fallback route to catch any other undefined routes */}
      <Route render={() => <Redirect to="/sign-in" />} />
    </Switch>
  );
};

export default Routes;

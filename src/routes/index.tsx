// Routes.tsx
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PublicRoute from './public-route';
import PrivateRoute from './private-route';
import { Page404Error } from '../pages/404Error/index';
import LoginPage from '../pages/Login';
import DashboardPage from '../pages/dashboard';
import RecruitmentPage from '../pages/recruitment';
import InventoryPage from '../pages/Inventory';
import ApplicantsPage from '../pages/Applicants';
import RegistrationPage from '../components/forms/Registration';
import { getCookie } from '../components/Utils/cookieUtils';

const Routes: React.FC = () => {
  const authToken = getCookie('authToken');
  const isAuthenticated = !!authToken;

  return (
    <Switch>
      <PublicRoute exact path="/sign-in" component={LoginPage} />
      <PublicRoute exact path="/sign-up" component={RegistrationPage} />

      {/* Redirect to dashboard only when accessing the root URL */}
      <Route
        exact
        path="/"
        render={() =>
          isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <LoginPage />
          )
        }
      />

      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <PrivateRoute exact path="/recruitment" component={RecruitmentPage} />
      <PrivateRoute exact path="/inventory" component={InventoryPage} />
      <PrivateRoute exact path="/applicants" component={ApplicantsPage} />
      <PublicRoute path="/404Error" component={Page404Error} />
    </Switch>
  );
};

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './public-route';
import { Page404Error } from '../pages/404Error/index';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import DashboardPage from '../pages/dashboard';
import RecruitmentPage from '../pages/recruitment';
import InventoryPage from '../pages/Inventory';
import ApplicantsPage from '../pages/Applicants'; // Import the ApplicantsPage component

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/sign-in" component={LoginPage} />
      <PublicRoute exact path="/sign-up" component={SignUpPage} />
      <PublicRoute exact path="/dashboard" component={DashboardPage} />
      <PublicRoute exact path="/recruitment" component={RecruitmentPage} />
      <PublicRoute exact path="/inventory" component={InventoryPage} />
      
      {/* Include the route for the ApplicantsPage */}
      <PublicRoute exact path="/applicants" component={ApplicantsPage} />

      <PublicRoute path="/404Error" component={Page404Error} />
    </Switch>
  );
};

export default Routes;

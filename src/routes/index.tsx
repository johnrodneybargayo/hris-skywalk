import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './public-route';
import { Page404Error } from '../pages/404Error/index';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import DashboardPage from '../pages/dashboard';
import RecruitmentPage from '../pages/recruitment';
import InventoryPage from '../pages/Inventory';
import ApplicantsPage from '../pages/Applicants';
import withAuthRedirect from '../components/auth/AuthRedirect'; // Import the HOC

const Routes: React.FC = () => {
  // Change this to true when the user is authenticated
  const isAuthenticated = true;

  const AuthenticatedDashboard = withAuthRedirect(DashboardPage, isAuthenticated);
  const AuthenticatedRecruitment = withAuthRedirect(RecruitmentPage, isAuthenticated);
  const AuthenticatedInventory = withAuthRedirect(InventoryPage, isAuthenticated);
  const AuthenticatedApplicants = withAuthRedirect(ApplicantsPage, isAuthenticated);

  return (
    <Switch>
      {/* ... */}
      <AuthenticatedDashboard exact path="/dashboard" isAuthenticated={isAuthenticated} />
      <AuthenticatedRecruitment exact path="/recruitment" isAuthenticated={isAuthenticated} />
      <AuthenticatedInventory exact path="/inventory" isAuthenticated={isAuthenticated} />
      <AuthenticatedApplicants exact path="/applicants" isAuthenticated={isAuthenticated} />
      {/* ... */}
      <PublicRoute path="/404Error" component={Page404Error} />
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/sign-in" component={LoginPage} />
      <PublicRoute exact path="/sign-up" component={SignUpPage} />
    </Switch>
  );
};

export default Routes;

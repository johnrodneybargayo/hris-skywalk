import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // Replace this with your actual login logic
    console.log('Login:', username, password);
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

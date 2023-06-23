import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/Login';

const LoginPage: React.FC = () => {
  const history = useHistory();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        // Redirect to the dashboard page
        history.push('/dashboard');
      } else {
        // Login failed
        const data = await response.json();
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

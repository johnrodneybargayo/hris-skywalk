import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/Login';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('https://hris-armada.vercel.app:3000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Login successful
          console.log('Login successful');
          // Redirect to the dashboard page
          history.push('/dashboard');
        } else {
          // Login failed
          setError(data.message);
        }
      } else {
        setError('An error occurred during login');
        // Redirect to the error 404 page
        history.push('/404Error');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('An error occurred during login');
      // Redirect to the error 404 page
      history.push('/404Error');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;

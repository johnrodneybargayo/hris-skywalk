import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/Login';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('https://empireone-global-inc.uc.r.appspot.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log('Response:', response); // Add this logging statement
  
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          console.log('Login successful');
          localStorage.setItem('accessToken', data.token);
          history.push('/dashboard');
        } else {
          setError(data.error);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('An error occurred during login');
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

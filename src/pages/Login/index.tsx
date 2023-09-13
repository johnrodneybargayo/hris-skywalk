import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/forms/Login';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const apiKey = 'AIzaSyAI1NsFZrRaBSRCtj8TkIxA3Mg-qYFDRzg'; // Replace with your actual API key
      const loginUrl = 'http://localhost:8080/api/login';

      console.log('Attempting login...');
      const response = await axios.post(
        loginUrl,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        }
      );

      console.log('Login response:', response);

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          // Set a cookie to store the user's authentication token
          Cookies.set('accessToken', data.token);

          // Redirect the user to the dashboard
          history.push('/dashboard');
        } else {
          setError(data.error || 'An error occurred during login');
        }
      } else {
        setError(response.data.error || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('Invalid email or password. Please enter them again.');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} isAuthenticated={false} /> {/* Update isAuthenticated as needed */}
      {error && <p className='error-login'>{error}</p>}
    </div>
  );
};

export default LoginPage;
